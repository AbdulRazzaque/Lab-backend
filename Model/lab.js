const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labSchema = new Schema(
  {
    labSelection: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lab", labSchema, "labs");
