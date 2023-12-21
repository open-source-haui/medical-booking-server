const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { healthFormValidation } = require('../../validations');
const { healthFormController } = require('../../controllers');
const { uploadService } = require('../../services');

const healthFormRoute = express.Router();

healthFormRoute
  .route('/')
  .get(auth, validate(healthFormValidation.getHealthForms), healthFormController.getHealthForms)
  .post(
    auth,
    uploadService.uploadImage.fields([
      { name: 'cmndImg', maxCount: 1 },
      { name: 'insuranceImg', maxCount: 1 },
    ]),
    validate(healthFormValidation.createHealthForm),
    healthFormController.createHealthForm,
  );

healthFormRoute
  .route('/:healthFormId')
  .get(auth, validate(healthFormValidation.getHealthForm), healthFormController.getHealthForm)
  .put(
    auth,
    uploadService.uploadImage.fields([
      { name: 'cmndImg', maxCount: 1 },
      { name: 'insuranceImg', maxCount: 1 },
    ]),
    validate(healthFormValidation.updateHealthForm),
    healthFormController.updateHealthForm,
  )
  .delete(
    auth,
    authorize(['admin']),
    validate(healthFormValidation.deleteHealthForm),
    healthFormController.deleteHealthForm,
  );

module.exports = healthFormRoute;
