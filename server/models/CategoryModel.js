const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Category name is required",
      minlength: [3, "Name too short"],
      maxlength: [32, "Name too long"],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
