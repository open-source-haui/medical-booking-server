const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch(() => logger.error('Connect to email server failed'));

const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token, name) => {
  const subject = 'Đặt lại mật khẩu';
  const resetPasswordUrl = `${config.base_url}/api/v1/auth/reset-password?token=${token}`;
  const html = `<p><b style="color:blue">Xin chào ${name}</b><br><i>Để đặt lại mật khẩu của bạn, hãy nhấp vào liên kết sau: ${resetPasswordUrl}<br>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</i></p>`;
  await sendEmail(to, subject, html);
};

const sendVerificationEmail = async (to, token, name) => {
  const subject = 'Xác thực email';
  const verificationEmailUrl = `${config.base_url}/api/v1/auth/verify-email?token=${token}`;
  const html = `<p><b style="color:blue">Xin chào ${name}</b><br><i>Để xác minh email của bạn, hãy nhấp vào liên kết sau: ${verificationEmailUrl}<br>Nếu bạn chưa tạo tài khoản, vui lòng bỏ qua email này.</i></p>`;
  await sendEmail(to, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
