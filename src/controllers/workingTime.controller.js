const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { workingTimeService } = require('../services');

const createWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.createWorkingTime(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, 'WorkingTime created successfully', workingTime));
});

const getWorkingTimes = catchAsync(async (req, res) => {
  const result = await workingTimeService.queryWorkingTimes(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', result));
});

const getWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.getWorkingTimeById(req.params.workingTimeId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', workingTime));
});

const updateWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.updateWorkingTimeById(req.params.workingTimeId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', workingTime));
});

const deleteWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.deleteWorkingTimeById(req.params.workingTimeId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', workingTime));
});

module.exports = {
  createWorkingTime,
  getWorkingTimes,
  getWorkingTime,
  updateWorkingTime,
  deleteWorkingTime,
};
