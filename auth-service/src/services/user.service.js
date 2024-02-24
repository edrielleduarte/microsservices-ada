const connectionDB = require('../../../db/services/db.service');

class UserService {
  static async userExistsByEmail(email) {
    return connectionDB.findUserByEmail(email);
  }

  static checkPassword(password, shouldMatchPassword) {
    return password === shouldMatchPassword;
  }
}

module.exports = UserService;
