const { WorkingPlan, Doctor } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

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
  const workingPlan = await WorkingPlan.findById(workingPlanId).populate('doctor');
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

// Auto generate working plan every day
function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

function generatePlace() {
  const x = getRandomNumber();
  const y = getRandomNumber();
  const z = getRandomNumber();
  return `Phòng khám ${x}0${y} - Tòa nhà A${z}`;
}

const autoGenerateWorkingPlan = async () => {
  const doctors = await Doctor.find();
  const currentDate = moment();
  for (let i = 0; i < 7; i++) {
    const date = currentDate.clone().add(i, 'days').format('YYYY-MM-DD');
    for (const doctor of doctors) {
      const workingPlan = await WorkingPlan.findOne({ doctor: doctor._id, date: date });
      if (!workingPlan) {
        await WorkingPlan.create({ doctor: doctor._id, date: date, place: generatePlace() });
      }
    }
  }
};

module.exports = {
  createWorkingPlan,
  queryWorkingPlans,
  getWorkingPlanById,
  updateWorkingPlanById,
  deleteWorkingPlanById,
  autoGenerateWorkingPlan,
};
