const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWorkingPlan = {
  body: Joi.object().keys({
    doctor: Joi.string().required().custom(objectId),
    place: Joi.string().required(),
    date: Joi.date().required(),
  }),
};

const getWorkingPlans = {
  query: Joi.object().keys({
    date: Joi.date(),
    place: Joi.string(),
    dayOfWeek: Joi.string(),
    doctorId: Joi.string(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWorkingPlan = {
  params: Joi.object().keys({
    workingPlanId: Joi.string().custom(objectId),
  }),
};

const updateWorkingPlan = {
  params: Joi.object().keys({
    workingPlanId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      doctor: Joi.string().custom(objectId),
      date: Joi.date(),
      place: Joi.string(),
    })
    .min(1),
};

const deleteWorkingPlan = {
  params: Joi.object().keys({
    workingPlanId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createWorkingPlan,
  getWorkingPlans,
  getWorkingPlan,
  updateWorkingPlan,
  deleteWorkingPlan,
};
