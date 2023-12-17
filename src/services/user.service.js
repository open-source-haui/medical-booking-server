const { User, Role } = require('../models');
const config = require('../config/config');
const logger = require('../config/logger');
const ExcelJS = require('exceljs');
const moment = require('moment');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email đã tồn tại');
  }
  const role = await Role.findOne({ roleIndex: 'khach-hang' });
  const roles = userBody.roles || (role ? [role._id] : []);
  userBody.roles = [...new Set(roles)];
  return User.create(userBody);
};

const queryUsers = async (userQuery) => {
  const filter = pick(userQuery, ['email', 'fullName']);
  const options = pick(userQuery, ['sortBy', 'limit', 'page', 'populate']);
  if (userQuery.role) {
    const roles = await Role.find({ roleIndex: userQuery.role });
    const roleIds = roles.map((role) => role._id);
    filter['roles'] = { $in: roleIds };
  }
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id).populate('roles');
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email đã tồn tại');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }
  await user.deleteOne();
  return user;
};

const lockUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }
  Object.assign(user, { isLocked: !user.isLocked });
  await user.save();
  return user;
};

const createAdminAccount = async () => {
  const admin = await User.findOne({ email: config.admin.email });
  if (!admin) {
    const role = await Role.findOne({ roleIndex: 'admin' });
    await User.create({
      email: config.admin.email,
      password: config.admin.password,
      fullName: config.admin.fullname,
      roles: [role._id],
      isEmailVerified: true,
    });
  }
  logger.info(`Admin account: ${config.admin.email}`);
  logger.info(`Admin password: ${config.admin.password}`);
};

const exportUsersToExcel = async (userQuery) => {
  const filter = pick(userQuery, ['email']);
  const options = pick(userQuery, ['sortBy', 'limit', 'page', 'populate']);
  if (userQuery.role) {
    const roles = await Role.find({ roleIndex: userQuery.role });
    const roleIds = roles.map((role) => role._id);
    filter['roles'] = { $in: roleIds };
  }
  const data = await User.paginate(filter, options);
  const users = data.results;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Danh sách');
  let index = 0;

  worksheet.columns = [
    { header: 'STT', key: 'index', width: 10 },
    { header: 'Họ và tên', key: 'fullName', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Ngày sinh', key: 'dateOfBirth', width: 20 },
    { header: 'Giới tính', key: 'gender', width: 20 },
    { header: 'Số điện thoại', key: 'phoneNumber', width: 20 },
    { header: 'Mã BHYT', key: 'codeInsurance', width: 20 },
    { header: 'Dân tộc', key: 'nation', width: 20 },
    { header: 'Số lần đăng nhập', key: 'numberLogined', width: 20 },
    { header: 'Ngày đăng nhập gần đây', key: 'dateLastLogined', width: 30 },
  ];

  users.forEach((user) => {
    worksheet.addRow({
      index: ++index,
      fullName: user.fullName,
      email: user.email,
      dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth).format('MM/DD/YYYY') : 'Chưa cập nhật',
      gender: user.gender ? user.gender : 'Chưa cập nhật',
      phoneNumber: user.phoneNumber ? user.phoneNumber : 'Chưa cập nhật',
      codeInsurance: user.codeInsurance ? user.codeInsurance : 'Chưa cập nhật',
      nation: user.nation ? user.nation : 'Chưa cập nhật',
      numberLogined: user.numberLogined,
      dateLastLogined: user.dateLastLogined ? moment(user.dateLastLogined).format('MM/DD/YYYY') : 'Không có',
    });
  });
  worksheet.getRow(1).font = { bold: true };
  worksheet.columns.forEach((column) => {
    column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });

  return workbook;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  lockUserById,
  createAdminAccount,
  exportUsersToExcel,
};
