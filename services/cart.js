const Cart = require("../models/cart");

const createCart = async (req, cart, price, quantity, productId) => {
  try {
    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({
        customer_id: req.user._id,
        items: [{ product_id: productId, quantity, price }],
      });
    } else {
      // Check if product is already in the cart
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === productId //compare product id
      );

      if (existingProductIndex >= 0) {
        // Update the quantity of the existing product
        cart.items[existingProductIndex].quantity += Number(quantity); //convert quantity in Number
      } else {
        // Add new product
        cart.items.push({ product_id: productId, quantity, price });
      }
    }

    // Calculate the total price
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    return await cart.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error });
  }
};

const getAllCarts = async (req, res) => {
  try {
    //get all Carts
    const allCarts = await Cart.find({}).populate("customer_id");
    return allCarts;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error });
  }
};

// const removeProductById = async (cartId,productId) => {
//   //remove product from cart by product id

//   const removeProductById = await Cart.findByIdAndUpdate(cartId,{
//     {items: [{ product_id: productId }],}
//   });
//   return removeProductById;
// };

module.exports = {
  createCart,
  getAllCarts,
};
