const axios = require('axios');
const { SESSION_SERVICE_BASE_URL, VALIDATE_SERVICE_BASE_URL } = process.env;
class SessionHandler {
  static async create(req, res) {
    try {
      const { data } = await axios.post(
        `${SESSION_SERVICE_BASE_URL}/create-session`,
        req.body,
      );

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res
        .status(error?.response?.status || 500)
        .json({ error: error?.response?.data?.error || 'Server Error ' });
    }
  }

  static async get(req, res) {
    try {
      const { data } = await axios.get(
        `${VALIDATE_SERVICE_BASE_URL}/validate-session`,
        {
          params: {
            id: req.query,
          },
        },
      );

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res
        .status(error?.response?.status || 500)
        .json({ error: error?.response?.data?.error || 'Server Error ' });
    }
  }
}

module.exports = SessionHandler;
