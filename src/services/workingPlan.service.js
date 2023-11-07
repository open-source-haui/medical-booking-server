const { WorkingPlan, Doctor } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createWorkingPlan = async (workingPlanBody) => {
  const doctor = await Doctor.findById(workingPlanBody.doctor);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  return WorkingPlan.create(workingPlanBody);
};

const queryWorkingPlans = async (workingPlanQuery) => {
  const filter = pick(workingPlanQuery, ['date', 'dayOfWeek', 'place']);
  const options = pick(workingPlanQuery, ['sortBy', 'limit', 'page', 'populate']);
  if (workingPlanQuery.doctorId) {
    filter['doctor'] = workingPlanQuery.doctorId;
  }
  const workingPlans = await WorkingPlan.paginate(filter, options);
  return workingPlans;
};

const getWorkingPlanById = async (workingPlanId) => {
  const workingPlan = await WorkingPlan.findById(workingPlanId);
  if (!workingPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'WorkingPlan not found');
  }
  return workingPlan;
};

const updateWorkingPlanById = async (workingPlanId, updateBody) => {
  const workingPlan = await getWorkingPlanById(workingPlanId);
  if (updateBody.doctor) {
    const doctor = await Doctor.findById(updateBody.doctor);
    if (!doctor) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
    }
  }
  Object.assign(workingPlan, updateBody);
  await workingPlan.save();
  return workingPlan;
};

const deleteWorkingPlanById = async (workingPlanId) => {
  const workingPlan = await getWorkingPlanById(workingPlanId);
  await workingPlan.deleteOne();
  return workingPlan;
};

module.exports = {
  createWorkingPlan,
  queryWorkingPlans,
  getWorkingPlanById,
  updateWorkingPlanById,
  deleteWorkingPlanById,
};
