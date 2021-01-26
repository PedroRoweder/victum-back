const connection = require("../../database");

// Schemas
const partSchema = require("../../schema/part");
const Part = connection.model("part", partSchema);

const PartController = {
  createPart: async (req, res) => {
    try {
      const newPart = new Part(req.body);

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
};

module.exports = PartController;
