const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true,
  message: 'Quá nhiều yêu cầu thất bại từ địa chỉ IP này, vui lòng thử lại sau',
});

module.exports = { authLimiter };
