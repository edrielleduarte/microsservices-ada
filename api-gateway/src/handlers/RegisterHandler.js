const axios = require('axios');
const { REGISTER_SERVICE_BASE_URL } = process.env;

class RegisterHandler {
  static async post(req, res) {
    try {
      const { data } = await axios.post(
        `${REGISTER_SERVICE_BASE_URL}/register`,
        req.body,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(error?.response?.status || 500)
        .json({ error: error?.response?.data?.error || 'Server Error ' });
    }
  }
}

module.exports = RegisterHandler;
