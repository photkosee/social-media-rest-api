const express = require("express");
const connectDB = require('./db');
require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;