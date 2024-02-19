const AddressService = require('../services/address.service');
const yup = require('yup');

class AddressController {
  static async get(req, res) {
    try {
      const { cep } = req.query.cep;

      if (cep.length < 8 || cep.length > 8) {
        return res
          .status(400)
          .json({ error: `O cep ${cep} é invalido favor verificar!` });
      }
      //Busca o cep com a api do viacep
      const address = await AddressService.getAddress(cep);

      return res.status(200).json({
        Cidade: address.localidade,
        Bairro: address.bairro,
        Logradouro: address.logradouro,
        Estado: address.uf,
      });
    } catch (error) {
      res.status(error.status).send(error.data);
    }
  }

  static async post(req, res) {
    try {
      const schema = yup.object({
        id: yup.number().required(),
        name: yup.string(),
        email: yup.string().email().required(),
        cpf: yup.string().required(),
        number: yup.string().required(),
        cep: yup.string().required(),
        country: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw { status: 400, message: 'Validation Fails' };
      }
      const { id, name, email, cpf, number, cep, country } = req.body;

      //Busca o cep com a api do viacep
      const address = await AddressService.getAddress(cep);

      //Cria o usuário no banco de dados com o endereço
      await AddressService.createAddress({
        id,
        name,
        email,
        cpf,
        street: address.logradouro,
        number,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
        country,
      });

      return res.status(201).send({
        message: 'User created with success',
        user: {
          id,
          name,
          email,
          cpf,
          street: address.logradouro,
          number,
          neighborhood: address.bairro,
          city: address.localidade,
          state: address.uf,
          country,
        },
      });
    } catch (error) {
      res.status(400).send(error.data);
    }
  }
}

module.exports = AddressController;
