require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const PORT = process.env.PORT || 3005;

const app = express();
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server listening on PORT::: ${PORT}`);
});
