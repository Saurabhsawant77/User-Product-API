const Address = require("../models/address");
const CustomerProduct = require("../models/customerProduct");

const handleAddAddress = async (req, res) => {
  try {
    const { street, city, state, pinCode, country } = req.body;
    if (!street || !city || !state || !pinCode || !country) {
      return res.status(400).json({ message: "Invalid input please check" });
    }

    const newAddress = await Address.create({
      street,
      city,
      state,
      pinCode,
      country,
      customer_id: req.user._id,
    });
    await newAddress.save();
    const address = await Address.find({ customer_id: req.user._id }).populate(
      "customer_id"
    );
    return res
      .status(201)
      .json({ message: "address add successfully....", address: address });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const handlePurchase = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({ message: "products are required" });
    }

    //get address by customer id
    const address = await Address.findOne({
      customer_id: req.user._id,
    }).populate("customer_id");
    const purchase = await CustomerProduct.create({
      products: products,
      customer_id: req.user._id,
      address_id: address._id,
    });
    await purchase.save();

    return res
      .status(201)
      .json({
        message: "Order Successful....",
        address: address,
        products: purchase,
      });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

module.exports = {
  handleAddAddress,
  handlePurchase,
};
