const axios = require('axios');
const connectionDB = require('../../../db/services/db.service');

class AddressService {
  static async getAddress(cep) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async createAddress({
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
    } catch (error) {
      throw { status: 400, message: 'Erro ao criar usuário' };
    }
  }
}

module.exports = AddressService;
