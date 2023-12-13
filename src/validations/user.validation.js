const Joi = require('joi');
const { email, password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    fullName: Joi.string(),
    password: Joi.string().custom(password),
    avatar: Joi.string(),
    gender: Joi.string(),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    cmndNumber: Joi.string(),
    codeInsurance: Joi.string(),
    cmndImg: Joi.string(),
    insuranceImg: Joi.string(),
    nation: Joi.string(),
    roles: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    email: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().custom(email),
      fullName: Joi.string(),
      password: Joi.string().custom(password),
      avatar: Joi.string(),
      gender: Joi.string(),
      dateOfBirth: Joi.date(),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      cmndNumber: Joi.string(),
      codeInsurance: Joi.string(),
      cmndImg: Joi.string(),
      insuranceImg: Joi.string(),
      nation: Joi.string(),
      roles: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
