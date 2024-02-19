const connectionDB = require('../../../db/services/db.service');
const connectRabbitCtrl = require('../../../notification-service/src/services/smpt-send.service');
const { AMQP_RABBITMQ_BASE_URL, EMAIL_USER, EMAIL_PASS } = process.env;

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
      });

      const messagem = ` Olá, Seja Bem Vindo ${name}! 
      Seu cadastro foi realizado com sucesso!
      Qualquer dúvida entre em contato conosco.
      Atenciosamente,
      Equipe de Cadastro `;

      const solicitation = {
        email,
        messagem,
      };

      await connectRabbitCtrl.connectRabbit(
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

module.exports = UserService;
