const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDoctor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    degree: Joi.string().required(),
    experience: Joi.number().required(),
    image: Joi.string(),
    departments: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getDoctors = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    degree: Joi.string(),
    experience: Joi.number(),
    departmentId: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
  }),
};

const updateDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    degree: Joi.string(),
    experience: Joi.number(),
    image: Joi.string(),
    departments: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const deleteDoctor = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
