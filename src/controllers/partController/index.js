const connection = require("../../database");

// Schemas
const partSchema = require("../../schema/part");

const PartController = {
  createPart: async (req, res) => {
    try {
      const Part = connection.model("part", partSchema);

      const newPart = new Part(req.body);

      await newPart.save();

      return res.status(200).json({ newPart });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  getParts: async (req, res) => {
    try {
      const { SKU } = req.params;
      const Part = await connection
        .model("part", partSchema)
        .findOne({ SKU })
        .exec();

      if (!Part) return res.status(404).json({ message: "Part not found." });

      return res.status(200).json({ Part });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = PartController;
