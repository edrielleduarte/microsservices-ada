const yup = require('yup');
const registerService = require('../services/register.service');

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
      });

      if (!(await schema.isValid(req.body))) {
        throw { status: 400, message: 'Validation Fails' };
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
      } = req.body;

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
      });

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
