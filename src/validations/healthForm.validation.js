const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHealthForm = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    workingTime: Joi.string().required().custom(objectId),
    doctor: Joi.string().custom(objectId),
    department: Joi.string(),
    numberOrder: Joi.number(),
    numberConfirm: Joi.number(),
    note: Joi.string(),
    status: Joi.string(),
  }),
};

const getHealthForms = {
  query: Joi.object().keys({
    numberOrder: Joi.number(),
    numberConfirm: Joi.number(),
    note: Joi.string(),
    status: Joi.string(),
    userId: Joi.string().custom(objectId),
    doctorId: Joi.string().custom(objectId),
    workingTimeId: Joi.string().custom(objectId),
    department: Joi.string(),
    dateOrder: Joi.string(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHealthForm = {
  params: Joi.object().keys({
    healthFormId: Joi.string().custom(objectId),
  }),
};

const updateHealthForm = {
  params: Joi.object().keys({
    healthFormId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'canceled'),
    note: Joi.string(),
    numberOrder: Joi.number(),
    numberConfirm: Joi.number(),
    deniedReason: Joi.string(),
    canceledReason: Joi.string(),
  }),
};

const deleteHealthForm = {
  params: Joi.object().keys({
    healthFormId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHealthForm,
  getHealthForms,
  getHealthForm,
  updateHealthForm,
  deleteHealthForm,
};
