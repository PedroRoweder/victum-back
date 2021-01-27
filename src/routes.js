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

// Parts
routes.post("/parts", PartController.createPart);
routes.get("/parts", PartController.listParts);
routes.get("/parts/:SKU", PartController.getPart);
// Parts End

module.exports = routes;
