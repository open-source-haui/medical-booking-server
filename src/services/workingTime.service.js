const { WorkingTime, WorkingPlan } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createWorkingTime = async (workingTimeBody) => {
  const workingPlan = await WorkingPlan.findById(workingTimeBody.workingPlan);
  if (!workingPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy lịch làm việc');
  }
  return WorkingTime.create(workingTimeBody);
};

const queryWorkingTimes = async (workingTimeQuery) => {
  const filter = pick(workingTimeQuery, ['startTime', 'endTime', 'maxSlots', 'registeredQuantity']);
  const options = pick(workingTimeQuery, ['sortBy', 'limit', 'page', 'populate']);
  if (workingTimeQuery.workingPlanId) {
    filter['workingPlan'] = workingTimeQuery.workingPlanId;
  }
  if (workingTimeQuery.doctorId && workingTimeQuery.date) {
    const workingPlan = await WorkingPlan.findOne({
      doctor: workingTimeQuery.doctorId,
      date: new Date(workingTimeQuery.date),
    });
    const workingTimes = await WorkingTime.find({ workingPlan: workingPlan?._id });
    const workingTimeIds = workingTimes.map((workingTime) => workingTime._id);
    filter['_id'] = { $in: workingTimeIds };
  } else if (workingTimeQuery.doctorId) {
    const workingPlans = await WorkingPlan.find({
      doctor: workingTimeQuery.doctorId,
    });
    const workingPlanIds = workingPlans.map((workingPlan) => workingPlan._id);
    filter['workingPlan'] = { $in: workingPlanIds };
  }
  const workingTimes = await WorkingTime.paginate(filter, options);
  return workingTimes;
};

const getWorkingTimeById = async (workingTimeId) => {
  const workingTime = await WorkingTime.findById(workingTimeId).populate('workingPlan');
  if (!workingTime) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy thời gian làm việc');
  }
  return workingTime;
};

const updateWorkingTimeById = async (workingTimeId, updateBody) => {
  const workingTime = await getWorkingTimeById(workingTimeId);
  if (updateBody.workingPlan) {
    const workingPlan = await WorkingPlan.findById(updateBody.workingPlan);
    if (!workingPlan) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy lịch làm việc');
    }
  }
  Object.assign(workingTime, updateBody);
  await workingTime.save();
  return workingTime;
};

const deleteWorkingTimeById = async (workingTimeId) => {
  const workingTime = await getWorkingTimeById(workingTimeId);
  await workingTime.deleteOne();
  return workingTime;
};

module.exports = {
  createWorkingTime,
  queryWorkingTimes,
  getWorkingTimeById,
  updateWorkingTimeById,
  deleteWorkingTimeById,
};
