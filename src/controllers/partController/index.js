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
      return res.status(500).json({ route: "POST /parts", message: error });
    }
  },
  listParts: async (req, res) => {
    try {
      const parts = await Part.find({}).select("-_id -__v");

      return res.status(200).json({ parts });
    } catch (error) {
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
      return res.status(500).json({ route: "GET /parts/:SKU", message: error });
    }
  },
  listParts: async (req, res) => {
    try {
      const Parts = await connection
        .model("part", partSchema)
        .find({}, "-_id SKU desc");

      if (!Parts) return res.status(404).json({ message: "No data found." });

      return res.status(200).json({ Parts });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = PartController;
