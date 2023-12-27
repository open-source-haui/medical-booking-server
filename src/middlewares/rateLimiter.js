const rateLimit = require('express-rate-limit');

const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  skipSuccessfulRequests: true,
  message: 'Quá nhiều yêu cầu thất bại từ địa chỉ IP này, vui lòng thử lại sau',
});

module.exports = { requestRateLimiter };
