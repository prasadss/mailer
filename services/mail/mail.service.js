const winston = require("winston");
const nodemailer = require("nodemailer");
module.exports = {
  sendMail,
};

async function sendMail(content, config) {
  let detail = JSON.parse(content);
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: config.get("SMTP_HOST"),
    port: config.get("SMTP_PORT"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: detail.fromEmail, // sender address
    to: detail.toEmail, // list of receivers
    subject: detail.subject, // Subject line
    text: detail.content, // plain text body
  });

  winston.debug(`Message sent: ${info.messageId}`);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  winston.debug(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
