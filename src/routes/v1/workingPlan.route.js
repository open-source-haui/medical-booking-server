const express = require('express');
const { auth, authorize } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { workingPlanValidation } = require('../../validations');
const { workingPlanController } = require('../../controllers');

const workingPlanRoute = express.Router();

workingPlanRoute
  .route('/')
  .get(validate(workingPlanValidation.getWorkingPlans), workingPlanController.getWorkingPlans)
  .post(
    auth,
    authorize(['admin']),
    validate(workingPlanValidation.createWorkingPlan),
    workingPlanController.createWorkingPlan,
  );
workingPlanRoute
  .route('/:workingPlanId')
  .get(validate(workingPlanValidation.getWorkingPlan), workingPlanController.getWorkingPlan)
  .put(
    auth,
    authorize(['admin']),
    validate(workingPlanValidation.updateWorkingPlan),
    workingPlanController.updateWorkingPlan,
  )
  .delete(
    auth,
    authorize(['admin']),
    validate(workingPlanValidation.deleteWorkingPlan),
    workingPlanController.deleteWorkingPlan,
  );

module.exports = workingPlanRoute;
