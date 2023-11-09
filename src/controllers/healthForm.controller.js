const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { healthFormService } = require('../services');

const createHealthForm = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const healthForm = await healthFormService.createHealthForm(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, 'HealthForm created successfully', healthForm));
});

const getHealthForms = catchAsync(async (req, res) => {
  const result = await healthFormService.queryHealthForms(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', result));
});

const getHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.getHealthFormById(req.params.healthFormId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', healthForm));
});

const updateHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.updateHealthFormById(req.params.healthFormId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', healthForm));
});

const deleteHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.deleteHealthFormById(req.params.healthFormId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', healthForm));
});

module.exports = {
  createHealthForm,
  getHealthForms,
  getHealthForm,
  updateHealthForm,
  deleteHealthForm,
};
