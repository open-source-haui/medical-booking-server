const validator = require('validator');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" phải là id hợp lệ');
  }
  return value;
};

const email = (value, helpers) => {
  if (!validator.isEmail(value)) {
    return helpers.message('Địa chỉ email không hợp lệ');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Mật khẩu phải chứa ít nhất 8 ký tự');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Mật khẩu phải chứa ít nhất một chữ cái và một số');
  }
  return value;
};

module.exports = {
  objectId,
  email,
  password,
};
