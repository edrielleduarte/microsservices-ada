const amqp = require('amqplib');
const sendEmailNotify = require('./writer-consumer.service');

class SendRabbitMQ {
  static async connectRabbitMQ(solicitation, AMQP_RABBITMQ_BASE_URL, nomeFila) {
    try {
      const { email, messagem } = solicitation;
      console.log('Conectando ao RabbitMQ --- sua mensagem:\n', messagem);
      try {
        const connection = await amqp
          .connect(AMQP_RABBITMQ_BASE_URL)
          .then((conn) => conn)
          .catch((err) => {
            console.log(err);
          });
        const channel = await connection.createChannel();

        channel.assertQueue('pedido', { exclusive: false });

        channel.consume(
          'pedido',
          console.log('--> Enviando email para o cliente...'),
          await sendEmailNotify.sendEmailNotifyClient(
            nomeFila,
            email,
            messagem,
          ),
          { noAck: true },
        );
      } catch (error) {
        throw error || 'Server Error';
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SendRabbitMQ;
