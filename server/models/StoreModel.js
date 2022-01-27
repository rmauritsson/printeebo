const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Store name is required",
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
