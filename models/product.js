const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Partner",
    },
    published: {
      type: Boolean,
      default: false,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true, //created createAt, updateAt
  }
);

productSchema.pre("save", function (next) {
  if (!this.createdBy) {
    this.createdBy = this._id;
  }
  if (!this.updatedBy) {
    this.updatedBy = this._id;
  }
  if (!this.userId) {
    this.userId = this._id;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
