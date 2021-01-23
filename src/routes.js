const routes = require("express").Router();

// Controllers
const IndexController = require("./controllers/index");
const OperationController = require("./controllers/operationController");

// health
routes.get(
  "/[health]{0,}$",
  (req, res, next) => next(),
  IndexController.getHealth
);

routes.post("/operation", OperationController.createOperation);

module.exports = routes;
