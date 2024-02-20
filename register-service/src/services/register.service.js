const connectionDB = require('../../../db/services/db.service');
const connectRabbit = require('../../../notification-service/src/services/rabbitmq.service');
const { AMQP_RABBITMQ_BASE_URL } = process.env;

class UserService {
  static async create({
    id,
    name,
    email,
    cpf,
    street,
    number,
    neighborhood,
    city,
    state,
    country,
    password
  }) {
    try {
      await connectionDB.createUser({
        id,
        name,
        email,
        cpf,
        street,
        number,
        neighborhood,
        city,
        state,
        country,
        password
      });

      const messagem = ` Olá, Seja Bem Vindo ${name}! 
      Seu cadastro foi realizado com sucesso!
      Qualquer dúvida entre em contato conosco.
      Atenciosamente,
      Equipe de Ada Edrielle Cadastro `;

      const solicitation = {
        email,
        messagem,
      };

      const nomeFila = 'register';

      await connectRabbit.connectRabbitMQ(
        solicitation,
        AMQP_RABBITMQ_BASE_URL,
        nomeFila,
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
