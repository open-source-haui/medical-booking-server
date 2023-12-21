const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHealthForm = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    email: Joi.string(),
    fullName: Joi.string(),
    gender: Joi.string().valid('Nam', 'Nữ', 'Khác'),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    cmndNumber: Joi.string(),
    codeInsurance: Joi.string(),
    cmndImg: Joi.string(),
    insuranceImg: Joi.string(),
    workingTime: Joi.string().required().custom(objectId),
    doctor: Joi.string().custom(objectId),
    department: Joi.string(),
    numberOrder: Joi.number(),
    numberConfirm: Joi.number(),
    reason: Joi.string(),
    note: Joi.string(),
    status: Joi.string().valid('pending', 'accepted', 'rejected'),
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
    user: Joi.string().custom(objectId),
    email: Joi.string(),
    fullName: Joi.string(),
    gender: Joi.string().valid('Nam', 'Nữ', 'Khác'),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    cmndNumber: Joi.string(),
    codeInsurance: Joi.string(),
    cmndImg: Joi.string(),
    insuranceImg: Joi.string(),
    workingTime: Joi.string().custom(objectId),
    doctor: Joi.string().custom(objectId),
    department: Joi.string(),
    numberOrder: Joi.number(),
    numberConfirm: Joi.number(),
    reason: Joi.string(),
    note: Joi.string(),
    status: Joi.string().valid('pending', 'accepted', 'rejected'),
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
