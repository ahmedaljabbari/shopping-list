const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    antal: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);

module.exports = Product;
