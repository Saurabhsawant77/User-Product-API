const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  image: String, // Store base64 string here
});

const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;