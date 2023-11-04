const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { doctorValidation } = require('../../validations');
const { doctorController } = require('../../controllers');
const { uploadService } = require('../../services');

const doctorRoute = express.Router();

doctorRoute
  .route('/')
  .get(auth, validate(doctorValidation.getDoctors), doctorController.getDoctors)
  .post(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.single('image'),
    validate(doctorValidation.createDoctor),
    doctorController.createDoctor,
  );
doctorRoute
  .route('/:doctorId')
  .get(auth, validate(doctorValidation.getDoctor), doctorController.getDoctor)
  .put(
    auth,
    authorize(['admin']),
    uploadService.uploadImage.single('image'),
    validate(doctorValidation.updateDoctor),
    doctorController.updateDoctor,
  )
  .delete(auth, authorize(['admin']), validate(doctorValidation.deleteDoctor), doctorController.deleteDoctor);
doctorRoute
  .route('/:doctorId/working-times')
  .get(auth, validate(doctorValidation.getWorkingTimesByDoctor), doctorController.getWorkingTimesByDoctor);

module.exports = doctorRoute;
