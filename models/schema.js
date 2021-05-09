const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "No Title."]
  },
  author: {
    type: String,
    required: [true, "No Last Name."]
  },
  price: {
    type: Number,
    required: [true, "No Price."]
  }
});

module.exports = schema;
