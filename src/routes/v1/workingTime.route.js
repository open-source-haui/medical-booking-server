const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { workingTimeValidation } = require('../../validations');
const { workingTimeController } = require('../../controllers');

const workingTimeRoute = express.Router();

workingTimeRoute
  .route('/')
  .get(validate(workingTimeValidation.getWorkingTimes), workingTimeController.getWorkingTimes)
  .post(
    auth,
    authorize(['admin']),
    validate(workingTimeValidation.createWorkingTime),
    workingTimeController.createWorkingTime,
  );
workingTimeRoute
  .route('/:workingTimeId')
  .get(validate(workingTimeValidation.getWorkingTime), workingTimeController.getWorkingTime)
  .put(auth, validate(workingTimeValidation.updateWorkingTime), workingTimeController.updateWorkingTime)
  .delete(
    auth,
    authorize(['admin']),
    validate(workingTimeValidation.deleteWorkingTime),
    workingTimeController.deleteWorkingTime,
  );

module.exports = workingTimeRoute;
