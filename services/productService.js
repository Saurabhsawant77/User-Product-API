const Product = require("../models/productSchema");


const createProduct = async (productData) => {
    
    const newProduct = new Product(productData);
    return await newProduct.save();
};

const getAllProducts = async () => {
    console.log("getAllProducts")
    return await Product.find({});
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProductById = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const getProductsByUserId = async (userId) => {
    return await Product.find({ createdBy: userId });
};

const getPublishedProducts = async () => {
    return await Product.find({ published: true });
};

const getProductByName = async (name) => {
    return await Product.find({ name });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByUserId,
    getPublishedProducts,
    getProductByName
};