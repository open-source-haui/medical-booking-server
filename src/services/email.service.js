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
  const subject = 'Reset password';
  const resetPasswordUrl = `${config.base_url}/api/v1/auth/reset-password?token=${token}`;
  const html = `<p><b style="color:blue">Hello ${name}</b><br><i>To reset your password, click on this link: ${resetPasswordUrl}<br>If you did not request any password resets, then ignore this email.</i></p>`;
  await sendEmail(to, subject, html);
};

const sendVerificationEmail = async (to, token, name) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `${config.base_url}/api/v1/auth/verify-email?token=${token}`;
  const html = `<p><b style="color:blue">Hello ${name}</b><br><i>To verify your email, click on this link: ${verificationEmailUrl}<br>If you did not create an account, then ignore this email.</i></p>`;
  await sendEmail(to, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
