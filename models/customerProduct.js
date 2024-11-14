const { boolean } = require("joi");
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
    orderCancel: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//customer product model
const CustomerProduct = mongoose.model(
  "CustomerProduct",
  customerProductSchema
);

module.exports = CustomerProduct;
