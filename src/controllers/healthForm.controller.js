const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const { healthFormService } = require('../services');

const uploadImage = (req, res) => {
  if (req.files) {
    // console.log(req.files);
    const cmndImg = req.files.cmndImg;
    const insuranceImg = req.files.insuranceImg;
    if (cmndImg) {
      req.body.cmndImg = cmndImg[0].path;
    }
    if (insuranceImg) {
      req.body.insuranceImg = insuranceImg[0].path;
    }
  }
  // console.log(req.body);
};

const createHealthForm = catchAsync(async (req, res) => {
  uploadImage(req, res);
  req.body.user = req.user.id;
  const healthForm = await healthFormService.createHealthForm(req.body);
  res
    .status(httpStatus.CREATED)
    .json(response(httpStatus.CREATED, 'Lịch hẹn khám đã được khởi tạo, vui lòng chờ xác nhận', healthForm));
});

const getHealthForms = catchAsync(async (req, res) => {
  const result = await healthFormService.queryHealthForms(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', result));
});

const getHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.getHealthFormById(req.params.healthFormId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', healthForm));
});

const updateHealthForm = catchAsync(async (req, res) => {
  uploadImage(req, res);
  const healthForm = await healthFormService.updateHealthFormById(req.params.healthFormId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', healthForm));
});

const deleteHealthForm = catchAsync(async (req, res) => {
  const healthForm = await healthFormService.deleteHealthFormById(req.params.healthFormId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, 'Thành công', healthForm));
});

module.exports = {
  createHealthForm,
  getHealthForms,
  getHealthForm,
  updateHealthForm,
  deleteHealthForm,
};
