const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { workingTimeService } = require('../services');

const createWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.createWorkingTime(req.body);
  res
    .status(httpStatus.CREATED)
    .json(response(httpStatus.CREATED, 'Tạo mới thời gian làm việc cho bác sĩ thành công', workingTime));
});

const getWorkingTimes = catchAsync(async (req, res) => {
  const result = await workingTimeService.queryWorkingTimes(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', result));
});

const getWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.getWorkingTimeById(req.params.workingTimeId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingTime));
});

const updateWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.updateWorkingTimeById(req.params.workingTimeId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingTime));
});

const deleteWorkingTime = catchAsync(async (req, res) => {
  const workingTime = await workingTimeService.deleteWorkingTimeById(req.params.workingTimeId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingTime));
});

module.exports = {
  createWorkingTime,
  getWorkingTimes,
  getWorkingTime,
  updateWorkingTime,
  deleteWorkingTime,
};
