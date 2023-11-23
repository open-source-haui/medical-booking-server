const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { workingPlanService } = require('../services');

const createWorkingPlan = catchAsync(async (req, res) => {
  const workingPlan = await workingPlanService.createWorkingPlan(req.body);
  res
    .status(httpStatus.CREATED)
    .json(response(httpStatus.CREATED, 'Tạo mới lịch làm việc cho bác sĩ thành công', workingPlan));
});

const getWorkingPlans = catchAsync(async (req, res) => {
  const result = await workingPlanService.queryWorkingPlans(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', result));
});

const getWorkingPlan = catchAsync(async (req, res) => {
  const workingPlan = await workingPlanService.getWorkingPlanById(req.params.workingPlanId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingPlan));
});

const updateWorkingPlan = catchAsync(async (req, res) => {
  const workingPlan = await workingPlanService.updateWorkingPlanById(req.params.workingPlanId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingPlan));
});

const deleteWorkingPlan = catchAsync(async (req, res) => {
  const workingPlan = await workingPlanService.deleteWorkingPlanById(req.params.workingPlanId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', workingPlan));
});

module.exports = {
  createWorkingPlan,
  getWorkingPlans,
  getWorkingPlan,
  updateWorkingPlan,
  deleteWorkingPlan,
};
