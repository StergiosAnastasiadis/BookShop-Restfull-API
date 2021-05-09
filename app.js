require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const booksSchema = require("./models/schema");

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}...`);
});
