require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const connectionDB = require('../db/src/connectBanco');

const PORT = process.env.PORT || 3007;

const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, async () => {
  console.log(`Server listening on PORT::: ${PORT}`);
  await connectionDB.ConnectDB();
});
