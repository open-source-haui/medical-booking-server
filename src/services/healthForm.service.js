const { HealthForm } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { departmentService, doctorService, workingTimeService } = require('./index');

const createHealthForm = async (healthFormBody) => {
  console.log(healthFormBody);
  // check tồn tại
  const doctor = await doctorService.getDoctorById(healthFormBody.doctor);
  const department = await departmentService.getDepartmentById(healthFormBody.department);
  const workingTime = await workingTimeService.getWorkingTimeById(healthFormBody.workingTime);

  // check + set numberOrder
  const healthForms = await HealthForm.find({
    doctor: doctor._id,
    workingTime: workingTime._id,
  });
  if (healthForms.length === 5) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Maximum number of health forms reached');
  }
  healthFormBody['numberOrder'] = healthForms.length + 1;

  return HealthForm.create(healthFormBody);
};

const queryHealthForms = async (healthFormQuery) => {
  const filter = pick(healthFormQuery, ['numberOrder', 'isConfirmed', 'note']);
  const options = pick(healthFormQuery, ['sortBy', 'limit', 'page', 'populate']);
  const healthForms = await HealthForm.paginate(filter, options);
  return healthForms;
};

const getHealthFormById = async (healthFormId) => {
  const healthForm = await HealthForm.findById(healthFormId);
  if (!healthForm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'HealthForm not found');
  }
  return healthForm;
};

const updateHealthFormById = async (healthFormId, updateBody) => {
  const healthForm = await getHealthFormById(healthFormId);

  if (updateBody.doctor) await doctorService.getDoctorById(updateBody.doctor);
  if (updateBody.department) await departmentService.getDepartmentById(updateBody.department);
  if (updateBody.workingTime) await workingTimeService.getWorkingTimeById(updateBody.workingTime);

  Object.assign(healthForm, updateBody);
  await healthForm.save();
  return healthForm;
};

const deleteHealthFormById = async (healthFormId) => {
  const healthForm = await getHealthFormById(healthFormId);
  await healthForm.deleteOne();
  return healthForm;
};

const getMyHealthForms = async (userId) => {
  return await HealthForm.find({ user: userId });
};

module.exports = {
  createHealthForm,
  queryHealthForms,
  getHealthFormById,
  updateHealthFormById,
  deleteHealthFormById,
  getMyHealthForms,
};
