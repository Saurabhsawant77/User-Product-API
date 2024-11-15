const fs = require("fs");
const path = require("path");
const ImageModel = require("../models/image");

async function getProductsWithImage(req,product) {
  try {
    //Check product has an image path
    if (!product.image) {
      throw new Error("Product has no image path");
    }

    //full path to the image
    const imagePath = path.join(__dirname, "../public", product.image);

    // Read the image file asynchronously
    const imageBuffer = await fs.promises.readFile(imagePath);

    // Convert the image buffer to Base64
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    const singleImage = await ImageModel.create({
        name : req.file.filename,
        image : base64Image
    });
    await singleImage.save();

    return singleImage;
    
    // return {
    //   ...product.toObject(),
    //   image: base64Image, 
    // };
  } catch (error) {
    console.error("Error converting image to Base64:", error.message);
    throw error;
  }
}

module.exports = {
  getProductsWithImage,
};
