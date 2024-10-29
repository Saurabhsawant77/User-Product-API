const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/productImg/');
    },
    filename: function (req, file, cb) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      cb(null, newFileName)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = {
    upload
  }