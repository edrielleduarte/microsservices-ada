const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  const bearer = req.headers['authorization'];

  if (!bearer) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [, token] = bearer.split(' ');

  try {
    const user = jwt.verify(token, JWT_SECRET_KEY); //Call session api

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 401)
      .json({ error: error.message || 'Unauthorized' });
  }
};
