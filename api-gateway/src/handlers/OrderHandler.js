const axios = require('axios');
const { ORDER_SERVICE_BASE_URL } = process.env;

class OrderHandler {
  static async post(req, res) {
    try {
      const { data } = await axios.post(
        `${ORDER_SERVICE_BASE_URL}/order`,
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

module.exports = OrderHandler;
