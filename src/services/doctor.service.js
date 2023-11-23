const { Doctor } = require('../models');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createDoctor = async (doctorBody) => {
  return Doctor.create(doctorBody);
};

const queryDoctors = async (doctorQuery) => {
  const filter = pick(doctorQuery, ['name', 'description', 'degree', 'experience']);
  if (doctorQuery.departmentId) {
    filter['departments'] = { $in: [doctorQuery.departmentId] };
  }
  const options = pick(doctorQuery, ['sortBy', 'limit', 'page', 'populate']);
  const doctors = await Doctor.paginate(filter, options);
  return doctors;
};

const getDoctorById = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId).populate('departments');
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bác sĩ');
  }
  return doctor;
};

const updateDoctorById = async (doctorId, updateBody) => {
  const doctor = await getDoctorById(doctorId);
  Object.assign(doctor, updateBody);
  await doctor.save();
  return doctor;
};

const deleteDoctorById = async (doctorId) => {
  const doctor = await getDoctorById(doctorId);
  await doctor.deleteOne();
  return doctor;
};

module.exports = {
  createDoctor,
  queryDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
