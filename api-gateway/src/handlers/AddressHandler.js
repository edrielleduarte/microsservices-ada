const axios = require('axios');
const { ADDRESS_SERVICE_BASE_URL } = process.env;

class AddressService {
  static async get(req, res) {
    try {
      const { data } = await axios.get(`${ADDRESS_SERVICE_BASE_URL}/address`, {
        params: {
          cep: req.query,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(error?.response?.status || 500)
        .json({ error: error?.response?.data?.error || 'Server Error ' });
    }
  }

  static async post(req, res) {
    try {
      const { data } = await axios.post(
        `${ADDRESS_SERVICE_BASE_URL}/address-save`,
        req.body,
      );
      return res.status(201).json(data);
    } catch (error) {
      return res
        .status(error?.response?.status || 500)
        .json({ error: error?.response?.data?.error || 'Server Error ' });
    }
  }
}

module.exports = AddressService;
