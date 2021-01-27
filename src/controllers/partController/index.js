const { model } = require("../../database");
const connection = require("../../database");

// Schemas
const partSchema = require("../../schema/part");
const Part = connection.model("part", partSchema);

const PartController = {
  createPart: async (req, res) => {
    try {
      const newPart = new Part(req.body);

      //Verifies if SKU is properly provided.

      if (!newPart.SKU)
        return res.status(422).json({ message: "Invalid SKU." });

      //Verifies if given SKU already exists.

      const existsSKU = await Part.findOne({ SKU: newPart.SKU }).exec();

      if (existsSKU)
        return res.status(409).json({ message: "This SKU already exists." });

      await newPart.save();

      return res.status(200).json({ newPart });
    } catch (error) {
      console.log("POST /parts", error);
      return res.status(500).json({ route: "POST /parts", message: error });
    }
  },
  updatePart: async (req, res) => {
    const { SKU } = req.params;

    try {
      let part = await Part.findOne({ SKU }).exec();

      if (!part) {
        res.status(404).json({ message: "Invalid SKU." });
      }

      // ! Think about a better way to do this, its horrible
      /* req.body.SKU ? (part.SKU = req.body.SKU) : undefined;
      req.body.desc ? (part.desc = req.body.desc) : undefined;
      req.body.operationList
        ? (part.operationList = req.body.operationList)
        : undefined; */

      part = Object.assign(part, req.body);

      await part.save();

      res.status(200).json({ updatedPart: part });
    } catch (error) {
      console.log("PUT /parts/:SKU", error);
      return res.status(500).json({ route: "PUT /parts/:SKU", message: error });
    }
  },
  listParts: async (req, res) => {
    try {
      const parts = await Part.find({}).select("-_id -__v");

      return res.status(200).json({ parts });
    } catch (error) {
      console.log("GET /parts", error);
      return res.status(500).json({ route: "GET /parts", message: error });
    }
  },
  getPart: async (req, res) => {
    try {
      const { SKU } = req.params;
      const part = await Part.findOne({ SKU }).exec();

      if (!part) return res.status(404).json({ message: "Part not found." });

      return res.status(200).json({ part });
    } catch (error) {
      console.log("GET /parts/:SKU", error);
      return res.status(500).json({ route: "GET /parts/:SKU", message: error });
    }
  },
};

module.exports = PartController;
