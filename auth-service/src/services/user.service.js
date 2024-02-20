const connectionDB = require('../../../db/services/db.service');

class UserService {
  static async userExistsByEmail(email) {
    return connectionDB.findUserByEmail(email);
  }

  static checkCpf(password, shouldMatchPassword) {
    return password === shouldMatchPassword;
  }
}

module.exports = UserService;
