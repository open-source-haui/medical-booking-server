const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWorkingTime = {
  body: Joi.object().keys({
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    maxSlots: Joi.number(),
    workingPlan: Joi.string().required().custom(objectId),
  }),
};

const getWorkingTimes = {
  query: Joi.object().keys({
    startTime: Joi.string(),
    endTime: Joi.string(),
    maxSlots: Joi.number(),
    populate: Joi.string(),
    doctorId: Joi.string(),
    date: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWorkingTime = {
  params: Joi.object().keys({
    workingTimeId: Joi.string().custom(objectId),
  }),
};

const updateWorkingTime = {
  params: Joi.object().keys({
    workingTimeId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      startTime: Joi.string(),
      endTime: Joi.string(),
      maxSlots: Joi.number(),
      registeredQuantity: Joi.number(),
      workingPlan: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteWorkingTime = {
  params: Joi.object().keys({
    workingTimeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createWorkingTime,
  getWorkingTimes,
  getWorkingTime,
  updateWorkingTime,
  deleteWorkingTime,
};
