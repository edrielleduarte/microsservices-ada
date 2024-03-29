const yup = require('yup');
const registerService = require('../services/register.service');
const findUserId = require('../../../db/services/db.service');

class RegisterController {
  static async create(req, res) {
    try {
      const schema = yup.object({
        id: yup.number().required(),
        name: yup.string(),
        email: yup.string().email().required(),
        cpf: yup.string().required(),
        street: yup.string().required(),
        number: yup.string().required(),
        neighborhood: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        country: yup.string().required(),
        password: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw {
          status: 400,
          message: 'Validação incorreta, verifique parâmetros de payload',
        };
      }

      const {
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
      } = req.body;

      const userExists = await findUserId.findUserById(id);

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já esta cadastrado' });
      } else {
        await registerService.create({
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
      }

      return res.status(201).json({
        message: 'User created with success',
        user: {
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
        },
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Server Error' });
    }
  }
}

module.exports = RegisterController;
