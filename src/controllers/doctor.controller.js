const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { doctorService } = require('../services');

const createDoctor = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const doctor = await doctorService.createDoctor(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, 'Tạo mới bác sĩ thành công', doctor));
});

const getDoctors = catchAsync(async (req, res) => {
  const result = await doctorService.queryDoctors(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', result));
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.doctorId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', doctor));
});

const updateDoctor = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  const doctor = await doctorService.updateDoctorById(req.params.doctorId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', doctor));
});

const deleteDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.deleteDoctorById(req.params.doctorId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', doctor));
});

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
