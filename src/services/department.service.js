const { Department, Doctor } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createDepartment = async (departmentBody) => {
  if (departmentBody.leader) {
    const leader = await Doctor.findById(departmentBody.leader);
    if (!leader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bác sĩ trưởng khoa');
    }
  }
  return Department.create(departmentBody);
};

const queryDepartments = async (departmentQuery) => {
  const filter = pick(departmentQuery, ['name', 'description', 'yearFounded']);
  const options = pick(departmentQuery, ['sortBy', 'limit', 'page', 'populate']);
  const departments = await Department.paginate(filter, options);
  return departments;
};

const getDepartmentById = async (departmentId) => {
  const department = await Department.findById(departmentId).populate('leader');
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy khoa khám');
  }
  return department;
};

const updateDepartmentById = async (departmentId, updateBody) => {
  const department = await getDepartmentById(departmentId);
  if (updateBody.leader) {
    const leader = await Doctor.findById(updateBody.leader);
    if (!leader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bác sĩ trưởng khoa');
    }
  }
  Object.assign(department, updateBody);
  await department.save();
  return department;
};

const deleteDepartmentById = async (departmentId) => {
  const department = await getDepartmentById(departmentId);
  await department.deleteOne();
  return department;
};

module.exports = {
  createDepartment,
  queryDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
