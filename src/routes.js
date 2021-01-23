const routes = require("express").Router();

// Controllers
const IndexController = require("./controllers/index");
const PartController = require("./controllers/partController");

// health
routes.get(
  "/[health]{0,}$",
  (req, res, next) => next(),
  IndexController.getHealth
);

routes.post("/parts", PartController.createPart);

routes.get("/parts/:SKU", PartController.getParts);

module.exports = routes;
