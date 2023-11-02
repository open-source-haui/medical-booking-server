const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDepartment = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    leader: Joi.string().custom(objectId),
    image: Joi.string(),
  }),
};

const getDepartments = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId),
  }),
};

const updateDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    leader: Joi.string().custom(objectId),
    image: Joi.string(),
  }),
};

const deleteDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
