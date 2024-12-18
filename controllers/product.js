const logger = require("../wrapper/logger");
const { productValidationAddSchema } = require("../middleware/joiValidation");
const Product = require("../models/product");
const Partner = require("../models/partner");
const mongoose = require("mongoose");
const { populate } = require("../models/role");
const { getProductsWithImage } = require("../wrapper/imageUtils");

const handleCreateProduct = async (req, res) => {
  try {
    if (!req.file) {
      logger.error("handleCreateProduct :: No image uploaded");
      return res.status(400).json({ message: "No image uploaded" });
    }
    const productImg = {
      name : req.file.filename,
      image : `/uploads/images/${req.file.filename}`
    }

    const img = await getProductsWithImage(req,productImg); 
    const validate = await productValidationAddSchema;
    const { name, description, price, rating } = req.body;
    
    const newProduct = await Product({
      name,
      description,
      partner_id: req.user._id,
      image: img,
      price,
      rating,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    }).save();
    // const productbase64 = await getProductsWithImage(newProduct);
    logger.info("handleCreateProduct ::: Product added Successfully ");
    return res
      .status(200)
      .json({ message: "Product added Successfully", product: newProduct });
  } catch (error) {
    logger.error(
      "handleCreateProduct :: Internal Server Error handleCreateProduct error -> ",
      error
    );
    return res
      .status(500)
      .json({ message: `Internal Server Error handleCreateProduct ${error}` });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const allProduct = await Product.find({}).populate('image');
    if (!allProduct) {
      logger.error("handleGetAllProducts :: No Products Found");
      return res.status(400).json({ message: "No Products Found" });
    }
    logger.info("handleGetAllProducts :: Product fetched Successfully ");
    return res.status(200).json(allProduct);
  } catch (error) {
    logger.error(
      "handleGetAllProducts :: Internal Server Error handleGetAllProducts"
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error handleGetAllProducts ======" });
  }
};

const handleGetAllProductsAddedByPartner = async (req, res) => {
  try {
    const allProduct = await Product.find({ createdBy: req.user._id }).populate('image');
    if (!allProduct) {
      logger.error("handleGetAllProductsAddedByPartner :: No Products Found");
      return res.status(400).json({ message: "No Products Found" });
    }
    logger.info(
      "handleGetAllProductsAddedByPartner :: Product fetched Successfully "
    );
    return res.status(200).json(allProduct);
  } catch (error) {
    logger.error(
      "handleGetAllProductsAddedByPartner :: Internal Server Error handleGetAllProductsAddedByAdmin"
    );
    return res.status(500).json({
      message: "Internal Server Error handleGetAllProductsAddedByPartner",
    });
  }
};

const handleGetProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('image');

    if (!product) {
      logger.error("handleGetProductById :: Product not found by ID");
      return res.status(404).json({ message: "Product not found by ID" });
    }
    logger.info("handleGetProductById :: Product fetched Successfully by ID");
    return res.status(200).json(product);
  } catch (error) {
    logger.error(
      "handleGetProductById :: Internal Server Error handleGetProductById"
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error handleGetProductById" });
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    const updateId = req.params.updateId;
    console.log(updateId + "-----");
    if (!updateId) {
      logger.error("handleUpdateProduct :: Product ID not provided");
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(req.file);

    let img = null;
    if (req.file) {
      const productImg = {
        name: req.file.filename,
        image: `/uploads/images/${req.file.filename}`
      };
      img = await getProductsWithImage(req, productImg);
    }

    const updateData = {
      ...req.body,
      updatedBy: req.user._id,
    };

    // Only add image to updateData if a new image is uploaded
    if (img) {
      updateData.image = img;
    }

    console.log(req.body, "Request body");
    const updatedProduct = await Product.findByIdAndUpdate(updateId, updateData, {
      new: true,
    });
    if (!updatedProduct) {
      logger.error("handleUpdateProduct :: Product not found for ID");
      return res.status(404).json({ message: "Product not found for ID" });
    }

    logger.info("handleUpdateProduct :: Product updated successfully");
    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    logger.error("handleUpdateProduct :: Error updating product", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetProductsToVerifyByAdmin = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner_details",
        },
      },
      {
        $unwind: "$partner_details",
      },
      {
        $lookup: {
          from: "users",
          localField: "partner_details.createdBy",
          foreignField: "_id",
          as: "admin_details",
        },
      },
      {
        $unwind: "$admin_details",
      },
      {
        $lookup: {
          from: "images",            
          localField: "image",       
          foreignField: "_id",       
          as: "image_details",        
        },
      },
      {
        $unwind: "$image_details",   
      },
      {
        $match: {
          "admin_details._id": userId,
        },
      },
      {
        $match: {
          isVerified: false,
          isDenied : false,
        },
      },
    ]);
    console.log("products :: ", products + " " + req.user._id);
    if (products.length === 0) {
      logger.error("handleGetProductsToVerifyByAdmin :: Products not found");
      return res.status(200).json({ message: "No Products to verify" });
    }

    logger.info(
      "handleGetProductsToVerifyByAdmin :: Product fetched successfully"
    );
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: products });
  } catch (error) {
    console.log(error);
    logger.error(
      "handleGetProductsToVerifyByAdmin :: Error fetching product",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const handleGetProductsVerifiedByAdmin = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner_details",
        },
      },
      {
        $unwind: "$partner_details",
      },
      {
        $lookup: {
          from: "users",
          localField: "partner_details.createdBy",
          foreignField: "_id",
          as: "admin_details",
        },
      },
      {
        $unwind: "$admin_details",
      },
      {
        $lookup: {
          from: "images",            
          localField: "image",       
          foreignField: "_id",       
          as: "image_details",        
        },
      },
      {
        $unwind: "$image_details",   
      },
      {
        $match: {
          "admin_details._id": userId,
        },
      },
      {
        $match: {
          $or: [
            { isDenied: true },
            { isVerified: true }
          ]
        }
      }
    ]);
    console.log("products :: ", products + " " + req.user._id);
    if (products.length === 0) {
      logger.error("handleGetProductsToVerifyByAdmin :: Products not found");
      return res.status(404).json({ message: "Product not found" });
    }

    logger.info(
      "handleGetProductsToVerifyByAdmin :: Product fetched successfully"
    );
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: products });
  } catch (error) {
    console.log(error);
    logger.error(
      "handleGetProductsToVerifyByAdmin :: Error fetching product",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const deleteId = req.params.id;
    if (!deleteId) {
      logger.error("handleDeleteProduct :: Product not exist for ID");
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await Product.findOneAndDelete({_id: deleteId});  //createdBy: req.user._id
    console.log(deletedProduct);
    if(!deletedProduct){
      logger.error("handleDeleteProduct :: Product not exist for ID");
      return res.status(404).json({ message: "Product not found" });
    }
    logger.info("handleDeleteProduct :: Product Deleted Successfully by ID");
    return res.status(200).json({ message: "Product Deleted" ,Product:deletedProduct});
  } catch (error) {
    logger.error(
      "handleDeleteProduct :: Internal Server Error handleDeleteProduct",
      error
    );
    return res
      .status(500)
      .json({ messgae: "Internal Server Error handleDeleteProduct" });
  }
};

const handleGetProductByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(req.user);
    console.log(userId);
    if (!userId) {
      logger.error("Product with User not found");
      return res.status(404).json({ message: "Product with User not found" });
    }
    const productsByUserId = await Product.find({ createdBy: userId }).populate('image');
    logger.info("handleGetProductByUserId :: Product fetched By User ID");
    return res
      .status(200)
      .json({ message: "Products Fetched Successfully", productsByUserId });
  } catch (error) {
    logger.error("Internal Server Error handleGetProductByUserId", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error handleGetProductByUserId" });
  }
};

const handleGetPublishedProducts = async (req, res) => {
  try {
    const isPublished = true;
    if (!isPublished) {
      logger.error("handleGetPublishedProducts :: Product not Published");
      return res.status(404).json({ message: "Product not found" });
    }
    const published = await Product.find({ isVerified: true }).populate('image');
    logger.info("handleGetPublishedProducts :: Published Products fetched ");
    return res
      .status(200)
      .json({ message: "Published Products Fetched Successfully", published });
  } catch (error) {
    logger.error(
      "handleGetPublishedProducts :: Internal Server Error handleGetPublishedProducts",
      error
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error handleGetPublishedProducts" });
  }
};

const handleGetProductByName = async (req, res) => {
  try {
    console.log("inside search by name", req.query);
    const { name } = req.query;

    if (!name) {
      logger.error("handleGetProductByName :: Product not found" + name);
      return res.status(404).json({ message: "Product not found++++" });
    } else {
      const productByName = await Product.find({ name: name , isVerified : true }).populate('image');
      console.log(productByName);

      if(productByName.length ===0 || !productByName){
        logger.error("handleGetProductByName :: Product not found" );
        return res.status(404).json({ message: "Product not found" });
      }

      logger.info(
        "handleGetProductByName :: Products By Name fetched Successfully"
      );
      return res
        .status(200)
        .json({ message: "Product Fetched Successfully", productByName });
    }
  } catch (error) {
    logger.error(
      "handleGetProductByName :: Internal Server Error handleGetProductByName"
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error handleGetProductByName" });
  }
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetProductByUserId,
  handleGetPublishedProducts,
  handleGetProductByName,
  handleGetAllProductsAddedByPartner,
  handleGetProductsToVerifyByAdmin,
  handleGetProductsVerifiedByAdmin,
};
