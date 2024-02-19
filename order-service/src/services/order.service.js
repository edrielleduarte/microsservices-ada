const connectionDB = require('../../../db/services/db.service');
const connectRabbitPedido = require('../../../notification-service/src/services/order-smpt.send.service');
const { AMQP_RABBITMQ_BASE_URL, EMAIL_USER, EMAIL_PASS } = process.env;

class OrderService {
  static async create({ id, user_id, description }) {
    try {
      //Busca o usuário no banco de dados
      const userRegister = await connectionDB.findUserById(id);

      if (!userRegister) {
        throw { status: 400, message: 'User not found' };
      }

      // Desestrutura o objeto user e o objeto userRegister
      const { email, name } = userRegister;

      //Cria o pedido no banco de dados com o id do usuário da tabela de usuário

      await connectionDB.createPedido({ id, user_id, description });

      const messagem = `Olá ${name}! Tudo Bem ? :]'
      O seu pedido: ${description}, foi realizado com sucesso!
      Agradecemos a preferência.
      Atenciosamente,
      Equipe de Pedido`;

      const solicitation = {
        email,
        messagem,
      };

      //Conecta ao RabbitMQ para enviar a notificação por emai;
      await connectRabbitPedido.connectRabbitPedido(
        solicitation,
        AMQP_RABBITMQ_BASE_URL,
        EMAIL_USER,
        EMAIL_PASS,
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = OrderService;
