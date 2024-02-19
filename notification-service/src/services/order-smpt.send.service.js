const amqp = require('amqplib');
const sendEmailNotify = require('./writer-consumer.service');

class SendSmptPedido {
  static async connectRabbitPedido(
    solicitation,
    AMQP_RABBITMQ_BASE_URL,
    emailUser,
    emailPass,
  ) {
    const { email, messagem } = solicitation;
    console.log('Conectando ao RabbitMQ --- sua mensagem:', messagem);
    try {
      const connection = await amqp
        .connect(AMQP_RABBITMQ_BASE_URL)
        .then((conn) => conn)
        .catch((err) => {
          console.log(err);
        });
      const channel = await connection.createChannel();

      const exChange = 'notify pedido';

      const queue = 'pedido';

      channel.assertExchange(exChange, 'fanout', { durable: false });

      await channel.assertQueue(
        queue,
        {
          exclusive: false,
        },
        (error) => {
          if (error) {
            console.log('Erro ao criar fila de pedido, erro: ', error);
          } else {
            console.log('Fila de pedido criada com sucesso');
          }
        },
      );

      channel.bindQueue(queue, exChange, '');

      channel.publish(
        exChange,
        '',
        Buffer.from(JSON.stringify(email, messagem)),
      );

      channel.consume(
        queue,
        (message) => {
          const m = JSON.parse(message.content.toString());
          console.log(' [x] %s', m);

          sendEmailNotify.sendEmailNotifyClient(
            email,
            messagem,
            emailUser,
            emailPass,
          );
        },
        { noAck: true },
      );
    } catch (error) {
      throw error || 'Server Error';
    }
  }
  catch(error) {
    throw error;
  }
}

module.exports = SendSmptPedido;
