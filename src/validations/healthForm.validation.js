const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHealthForm = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    workingTime: Joi.string().required().custom(objectId),
    department: Joi.string().required().custom(objectId),
    doctor: Joi.string().required().custom(objectId),
    note: Joi.string(),
  }),
};

const getHealthForms = {
  query: Joi.object().keys({
    numberOrder: Joi.number(),
    note: Joi.string(),
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
    workingTime: Joi.string().custom(objectId),
    department: Joi.string().custom(objectId),
    doctor: Joi.string().custom(objectId),
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'cancel'),
    note: Joi.string(),
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
