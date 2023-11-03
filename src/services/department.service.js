const { Department, Doctor } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createDepartment = async (departmentBody) => {
  const leader = await Doctor.findById(departmentBody.leader);
  if (!leader) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leader not found');
  }
  return Department.create(departmentBody);
};

const queryDepartments = async (departmentQuery) => {
  const filter = pick(departmentQuery, ['name', 'decription']);
  const options = pick(departmentQuery, ['sortBy', 'limit', 'page', 'populate']);
  const departments = await Department.paginate(filter, options);
  return departments;
};

const getDepartmentById = async (departmentId) => {
  const department = await Department.findById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  return department;
};

const updateDepartmentById = async (departmentId, updateBody) => {
  const department = await getDepartmentById(departmentId);
  if (updateBody.leader) {
    const leader = await Doctor.findById(updateBody.leader);
    if (!leader) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Leader not found');
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
