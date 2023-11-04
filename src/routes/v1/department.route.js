const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { departmentValidation } = require('../../validations');
const { departmentController } = require('../../controllers');
const { uploadService } = require('../../services');

const departmentRoute = express.Router();

departmentRoute
  .route('/')
  .get(auth, validate(departmentValidation.getDepartments), departmentController.getDepartments)
  .post(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.single('image'),
    validate(departmentValidation.createDepartment),
    departmentController.createDepartment,
  );

departmentRoute
  .route('/:departmentId')
  .get(auth, validate(departmentValidation.getDepartment), departmentController.getDepartment)
  .put(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.single('image'),
    validate(departmentValidation.updateDepartment),
    departmentController.updateDepartment,
  )
  .delete(
    auth,
    authorize(['admin']),
    validate(departmentValidation.deleteDepartment),
    departmentController.deleteDepartment,
  );

departmentRoute
  .route('/:departmentId/doctors')
  .get(auth, validate(departmentValidation.getDoctorsByDepartment), departmentController.getDoctorsByDepartment);

module.exports = departmentRoute;
