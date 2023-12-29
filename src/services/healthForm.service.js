const { HealthForm } = require('../models');
const { workingTimeService, workingPlanService, doctorService, departmentService, emailService } = require('./');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

const createHealthForm = async (healthFormBody) => {
  const wokingTime = await workingTimeService.getWorkingTimeById(healthFormBody.workingTime);
  const workingPlan = await workingPlanService.getWorkingPlanById(wokingTime.workingPlan._id);
  healthFormBody.doctor = workingPlan.doctor._id;
  const doctor = await doctorService.getDoctorById(workingPlan.doctor._id);
  const department = await departmentService.getDepartmentById(doctor.department._id);
  healthFormBody.department = department.name;
  const healthForms = await HealthForm.find({ workingTime: wokingTime._id });
  const numberOrder = healthForms.length + 1;
  healthFormBody.numberOrder = numberOrder;
  return await HealthForm.create(healthFormBody);
};

const queryHealthForms = async (healthFormQuery) => {
  const filter = pick(healthFormQuery, ['department', 'numberOrder', 'numberConfirm', 'note', 'status']);
  const options = pick(healthFormQuery, ['sortBy', 'limit', 'page', 'populate']);
  if (healthFormQuery.userId) {
    filter['user'] = healthFormQuery.userId;
  }
  if (healthFormQuery.doctorId) {
    filter['doctor'] = healthFormQuery.doctorId;
  }
  if (healthFormQuery.workingTimeId) {
    filter['workingTime'] = healthFormQuery.workingTimeId;
  }
  if (healthFormQuery.createdAt) {
    const dateValue = healthFormQuery.createdAt;
    let dateStart = new Date(dateValue.split('/')[0]);
    let dateEnd = new Date(dateValue.split('/')[1]);
    dateEnd.setDate(dateEnd.getDate() + 1);
    filter['createdAt'] = { $gte: dateStart, $lte: dateEnd };
  }
  const healthForms = await HealthForm.paginate(filter, options);
  return healthForms;
};

const getHealthFormById = async (healthFormId) => {
  const healthForm = await HealthForm.findById(healthFormId).populate([
    'user',
    'doctor',
    {
      path: 'workingTime',
      populate: 'workingPlan',
    },
  ]);
  if (!healthForm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy lịch hẹn khám');
  }
  return healthForm;
};

const updateHealthFormById = async (healthFormId, updateBody) => {
  const healthForm = await getHealthFormById(healthFormId);
  if (healthForm.status === 'rejected') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Lịch hẹn khám đã bị hủy');
  }
  if (updateBody.status === 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trạng thái cho phép cập nhật là confirm hoặc reject');
  }
  const workingTime = await workingTimeService.getWorkingTimeById(healthForm.workingTime);
  if (healthForm.status === 'pending') {
    if (updateBody.status === 'accepted') {
      // pending -> accepted
      const healthFormConfirms = await HealthForm.find({ workingTime: healthForm._id, status: 'accepted' });
      if (healthFormConfirms.length == workingTime.maxSlots) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Lịch hẹn khám đã đầy');
      }
      healthForm.numberConfirm = healthFormConfirms.length + 1;
      workingTime.registeredQuantity = workingTime.registeredQuantity + 1;
      await workingTime.save();
      emailService.sendMsgEmail({
        email: healthForm.user.email,
        fullName: healthForm.user.fullName,
        time:
          healthForm.workingTime.startTime +
          'h - ' +
          healthForm.workingTime.endTime +
          'h ngày ' +
          moment(healthForm.workingTime.workingPlan.date).format('DD/MM/YYYY'),
        place: healthForm.workingTime.workingPlan.place,
        stt: healthFormConfirms.length + 1,
      });
    } else {
      emailService.sendMsgEmail({
        email: healthForm.user.email,
        fullName: healthForm.user.fullName,
        deniedReason: updateBody.deniedReason,
      });
    }
  } else {
    if (updateBody.status === 'rejected') {
      // accepted -> rejected
      HealthForm.updateMany(
        { wokingTime: healthForm.wokingTime, numberConfirm: { $gt: healthForm.numberConfirm } },
        { $inc: { numberConfirm: -1 } },
      );
      workingTime.registeredQuantity = workingTime.registeredQuantity - 1;
      await workingTime.save();
    }
  }
  Object.assign(healthForm, updateBody);
  await healthForm.save();
  return healthForm;
};

const deleteHealthFormById = async (healthFormId) => {
  const healthForm = await getHealthFormById(healthFormId);
  await healthForm.deleteOne();
  return healthForm;
};

module.exports = {
  createHealthForm,
  queryHealthForms,
  getHealthFormById,
  updateHealthFormById,
  deleteHealthFormById,
};
