const nodemailer = require('nodemailer');

class SendEmailNotifyClient {
  static async sendEmailNotifyClient(email, message, emailUser, emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: emailUser || process.env.EMAIL_USER,
          pass: emailPass || process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: emailUser || process.env.EMAIL_USER,
        to: email,
        subject: 'Notification Service',
        text: message,
      };

      const notify = await transporter.sendMail(mailOptions);
      return notify;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SendEmailNotifyClient;
