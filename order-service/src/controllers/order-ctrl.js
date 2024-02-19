const yup = require('yup');
const orderService = require('../services/order.service');

class OrderController {
  static async create(req, res) {
    try {
      const schema = yup.object({
        id: yup.number().required(),
        user_id: yup.number().required(),
        description: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw { status: 400, message: 'Validation Fails' };
      }

      const { id, user_id, description } = req.body;

      await orderService.create({ id, user_id, description });

      return res.status(201).json({
        message: 'User created with success',
        user: {
          id,
          user_id,
          description,
        },
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Server Error' });
    }
  }
}

module.exports = OrderController;
