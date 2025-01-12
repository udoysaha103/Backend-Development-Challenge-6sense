const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter a product name."] },
    description: {
      type: String,
      required: [true, "Please enter a product description."],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price of the product."],
    },
    discount: { type: Number, default: 0 },  // discount in percentage (0-100)
    image: { type: String, required: [true, "Please enter the image URL."] },
    status: {
      type: String,
      enum: ["In Stock", "Stock Out"],
      default: "In Stock",
    },
    productCode: {
      type: String,
      unique: true,
      required: [true, "Please enter a product code."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);
module.exports = Product;