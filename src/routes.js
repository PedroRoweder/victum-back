const routes = require("express").Router();

// Controllers
const IndexController = require("./controllers/index");
const PartController = require("./controllers/partController");
const partSchema = require("./schema/part");

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
routes.put("/parts/:SKU", PartController.updatePart);
routes.delete("/parts/:SKU", PartController.deletePart);
// Parts End

module.exports = routes;
