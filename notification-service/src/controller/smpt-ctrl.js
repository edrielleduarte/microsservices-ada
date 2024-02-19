const smptService = require('../services/smpt-send.service');
const { AMQP_RABBITMQ_BASE_URL, EMAIL_USER, EMAIL_PASS } = process.env;

class SmtpController {
  static async sendEmail(req, res) {
    try {
      await smptService.connectRabbit(
        req.body,
        AMQP_RABBITMQ_BASE_URL,
        EMAIL_USER,
        EMAIL_PASS,
      );

      await smptService.connectRabbit({ email, messagem });
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
}

module.exports = SmtpController;
