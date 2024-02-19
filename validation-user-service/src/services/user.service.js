const connectionDB = require('../../../db/services/db.service');

class UserService {
  static async userExistsById(id) {
    const user = await connectionDB.findUserById(id);
    return user;
  }
}
module.exports = UserService;
