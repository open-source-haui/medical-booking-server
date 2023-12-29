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

const sendMsgEmail = async (data) => {
  const subject = 'Xác nhận lịch hẹn khám';
  let html;
  if (!data.deniedReason) {
    html = `
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #ccc; background-color: yellow; font-family: Arial, sans-serif; padding: 50px; text-align: center;">
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold">Xin chào ${data.fullName}</p>
          <p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Đơn khám của bạn đã được phê duyệt<br>
            Thời gian: ${data.time}<br>
            Phòng khám: ${data.place}<br>
            Số thứ tự: ${data.stt}<br>
            Vui lòng đến đúng thời gian đã hẹn!<br>
          <p style="font-size: 16px; line-height: 24px;">Trân trọng,<br>
          [Bệnh viện đa khoa Hà Nội]</p>
        </td>
      </tr>
    </table>
    `;
  } else {
    html = `
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #ccc; background-color: yellow; font-family: Arial, sans-serif; padding: 50px; text-align: center;">
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 18px; margin-bottom: 20px;">Xin chào ${data.fullName}</p>
          <p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Đơn khám của bạn không được chấp nhận<br>
            Lý do: ${data.deniedReason}<br>
          <p style="font-size: 16px; line-height: 24px;">Trân trọng,<br>
          [Bệnh viện đa khoa Hà Nội]</p>
        </td>
      </tr>
    </table>
    `;
  }
  await sendEmail(data.email, subject, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMsgEmail,
};
