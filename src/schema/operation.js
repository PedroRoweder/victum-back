const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  SKU: String,
  desc: String,
  operationList: [
    {
      operationTitle: String,
      status: String, //DOING, DONE, TODO.
      steps: Array,
    },
  ],
});

module.exports = operationSchema;
