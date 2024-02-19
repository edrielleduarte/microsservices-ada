require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3006;

const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on PORT::: ${PORT}`));
