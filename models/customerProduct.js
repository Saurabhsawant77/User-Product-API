const mongoose = require("mongoose");

const customerProductSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

const CustomerProduct = mongoose.model(
  "CustomerProduct",
  customerProductSchema
);

module.exports = CustomerProduct;
