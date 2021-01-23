const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_DB;
const mongoID = process.env.MONGO_ID;
const mongoPassword = process.env.MONGO_PASS;

mongoose.connect(
  `mongodb+srv://${mongoID}:${mongoPassword}@autopflege-cluster.b9ki9.mongodb.net/${mongoDB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => console.log("MongoDB connected..."));
module.exports = connection;
