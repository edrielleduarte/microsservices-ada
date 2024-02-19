const mongoose = require('mongoose');

const user = mongoose.model('user', {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const pedido = mongoose.model('pedido', {
  id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

class ModelDB {
  static async createDataBaseUser({
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
      const userSchema = new user({
        id: id,
        name: name,
        email: email,
        cpf: cpf,
        street: street,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        country: country,
      });

      await userSchema.save(userSchema);
    } catch (error) {
      throw { status: 400, message: 'Erro ao criar schema user' };
    }
  }

  static async CreateDataBasePedido({ id, user_id, description }) {
    try {
      const userSchemaPedido = new pedido({
        id: id,
        user_id: user_id,
        description: description,
      });

      await userSchemaPedido.save(userSchemaPedido);
    } catch (error) {
      throw { status: 400, message: 'Erro ao criar schema pedido' };
    }
  }

  static async findUserById(id) {
    try {
      const userSchema = await user.findOne({ id: id });
      return userSchema;
    } catch (error) {
      throw { status: 400, message: 'Erro ao buscar usuário' };
    }
  }

  static async findUserByEmail(email) {
    try {
      const userSchema = await user.findOne({ email: email });
      return userSchema;
    } catch (error) {
      throw { status: 400, message: 'Erro ao buscar usuário por email' };
    }
  }
}

module.exports = ModelDB;
