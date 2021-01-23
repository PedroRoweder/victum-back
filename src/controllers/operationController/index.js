const connection = require("../../database");

// Schemas
const operationSchema = require("../../schema/operation");

const OperationController = {
  createOperation: async (req, res) => {
    const Operation = connection.model("operations", operationSchema);

    const newOperation = new Operation(req.body);

    await newOperation.save();

    return res.status(200).json({ newOperation });
  },
};

module.exports = OperationController;
