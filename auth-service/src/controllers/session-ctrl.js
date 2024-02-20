const yup = require('yup');
const UserService = require('../services/user.service');
const SessionService = require('../services/session.service');

class SessionController {
  static async create(req, res) {
    try {
      const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(401).json({ error: 'Invalid Credentials' });
      }

      const user = await UserService.userExistsByEmail(req.body.email);

      if (!user || !UserService.checkCpf(req.body.password, user?.password)) {
        throw { status: 401, message: 'Invalid Credentials' };
      }

      const token = SessionService.create(user);

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ error: error.message || 'Server Error' });
    }
  }
}

module.exports = SessionController;
