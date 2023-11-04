const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { doctorService } = require('../services');

const createDoctor = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const doctor = await doctorService.createDoctor(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, 'Doctor created successfully', doctor));
});

const getDoctors = catchAsync(async (req, res) => {
  const result = await doctorService.queryDoctors(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', result));
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.doctorId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', doctor));
});

const updateDoctor = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const doctor = await doctorService.updateDoctorById(req.params.doctorId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', doctor));
});

const deleteDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.deleteDoctorById(req.params.doctorId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', doctor));
});

const getWorkingTimesByDoctor = catchAsync(async (req, res) => {
  const workingTimes = await doctorService.getWorkingTimesByDoctor(req.params.doctorId, req.body.date);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Success', workingTimes));
});

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getWorkingTimesByDoctor,
};
