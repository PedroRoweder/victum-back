const express = require("express");
const cors = require("cors");

// Configuring .env
require("dotenv").config();

// Routes
const routes = require("./src/routes");

// Instanciating Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

module.exports = app;
