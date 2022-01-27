const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Come back later and add other fields
const UserSchema = new mongoose.Schema(
  {
    name: String,

    phone: String,

    email: { type: String, required: true, index: true },

    role: { type: String, default: "buyer" },

    cart: { type: Array, default: [] },

    address: String,

    //wishlist: [{type: ObjectId, ref: 'Product'}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
