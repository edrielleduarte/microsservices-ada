const connectionDB = require('../../../db/services/db.service');

class UserService {
  static async userExistsByEmail(email) {
    return connectionDB.findUserByEmail(email);
  }

  static checkCpf(cpf, shouldMatchCpf) {
    return cpf === shouldMatchCpf;
  }
}

module.exports = UserService;
