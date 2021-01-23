const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  operationTitle: String,
  status: String, //DOING, DONE, TODO.
  steps: Array,
});

module.exports = operationSchema;
