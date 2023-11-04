const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, 'Department created successfully', department));
});

const getDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.queryDepartments(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', result));
});

const getDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.departmentId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', department));
});

const updateDepartment = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const department = await departmentService.updateDepartmentById(req.params.departmentId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', department));
});

const deleteDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.deleteDepartmentById(req.params.departmentId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', department));
});

const getDoctorsByDepartment = catchAsync(async (req, res) => {
  console.log(req.params.departmentId);
  const doctors = await departmentService.getDoctorsByDepartment(req.params.departmentId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', doctors));
});

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getDoctorsByDepartment,
};
