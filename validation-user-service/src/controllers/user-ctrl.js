const UserService = require('../services/user.service');

class UserController {
  static async get(req, res) {
    try {
      const { id } = req.query.id;

      const idTransformed = Number(id);

      const user = await UserService.userExistsById(idTransformed);

      if (!user) {
        throw { status: 404, message: 'User not found' };
      }

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Server Error' });
    }
  }
}

module.exports = UserController;
