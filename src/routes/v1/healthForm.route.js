const express = require('express');
const { auth, authorize, isMyHealthForm } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { healthFormValidation } = require('../../validations');
const { healthFormController } = require('../../controllers');

const healthFormRoute = express.Router();

healthFormRoute
  .route('/')
  .get(
    auth,
    authorize(['admin', 'nhan-vien-phe-duyet']),
    validate(healthFormValidation.getHealthForms),
    healthFormController.getHealthForms,
  )
  .post(auth, validate(healthFormValidation.createHealthForm), healthFormController.createHealthForm);

healthFormRoute.route('/my').get(auth, healthFormController.getMyHealthForms);

healthFormRoute
  .route('/:healthFormId')
  .get(auth, validate(healthFormValidation.getHealthForm), healthFormController.getHealthForm)
  .put(
    auth,
    isMyHealthForm(['admin', 'nhan-vien-phe-duyet']),
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
