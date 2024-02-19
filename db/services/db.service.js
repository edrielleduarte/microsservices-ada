const UserRegister = require('../model/CreateDataBase');

// Classe que contém os métodos que interagem com o banco de dados

// Cria um usuário no banco de dados
class UserService {
  static async createUser({
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
      await UserRegister.createDataBaseUser({
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
    } catch (error) {
      throw { status: 400, message: 'Erro ao criar usuário' };
    }
  }

  // Cria um pedido no banco de dados
  static async createPedido({ id, user_id, description }) {
    try {
      await UserRegister.CreateDataBasePedido({
        id,
        user_id,
        description,
      });
    } catch (error) {
      throw { status: 400, message: 'Erro ao criar pedido' };
    }
  }

  // Busca um usuário no banco de dados pelo id
  static async findUserById(id) {
    const userSchema = await UserRegister.findUserById(id);
    return userSchema;
  }

  // Busca um usuário no banco de dados pelo email
  static async findUserByEmail(email) {
    const userSchemaEmail = await UserRegister.findUserByEmail(email);
    return userSchemaEmail;
  }
}

module.exports = UserService;
