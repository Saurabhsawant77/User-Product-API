const mongoose = require("mongoose");

const customerProductSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Allowed values
    default: "active", // Default status
  },
});

const CustomerProduct = mongoose.model("CustomerProduct", customerProductSchema);

module.exports = CustomerProduct;
