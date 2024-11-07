const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    profileImage: {
      type: String,
      default: "../images/default-profile-picture.jpg",
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
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.createdBy) {
    this.createdBy = this._id;
  }
  if (!this.updatedBy) {
    this.updatedBy = this._id;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
