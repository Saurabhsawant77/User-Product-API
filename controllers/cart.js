const Cart = require("../models/cart");
const Product = require("../models/product");
const { createCart, getAllCarts } = require("../services/cart");
const logger = require("../wrapper/logger");

const handleAddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    //Check if product exists
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = product.price;

    // Find the customer's cart
    const cart = await Cart.findOne({ customer_id: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const carts = await createCart(req, cart, price, quantity, productId);
    logger.info("handleAddToCart :: Cart added Successfully ");
    return res
      .status(200)
      .json({ message: "Item added to cart", carts: carts });
  } catch (error) {
    console.error(error);
    logger.error("handleAddToCart :: error ", error);
    return res.status(500).json({ message: "server error", error });
  }
};

const handleGetAllCarts = async (req, res) => {
  try {
    //get all Carts
    const allCarts = await getAllCarts();

    return res.status(200).json({ carts: allCarts });
  } catch (error) {
    console.error(error);
    logger.error("handleGetAllCarts :: error ", error);
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  handleGetAllCarts,
  handleAddToCart,
};
