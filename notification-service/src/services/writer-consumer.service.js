const nodemailer = require('nodemailer');

class SendEmailNotifyClient {
  static async sendEmailNotifyClient(nomeFila, email, message) {
    try {
      let messagem = '';

      if (nomeFila === 'pedido ifood') {
        messagem = message;
      } else if (nomeFila === 'register') {
        messagem = message;
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail', // testei com gmail
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log('Sending email to:', email);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Ada Food Delivery!',
        text: messagem,
      };

      const notify = transporter.sendMail(mailOptions);
      return notify;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SendEmailNotifyClient;
