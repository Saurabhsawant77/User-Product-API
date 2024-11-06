const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner_id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["super_admin", "admin", "partner", "customer"],
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

partnerSchema.pre("save", function (next) {
  if (!this.createdBy) {
    this.createdBy = this._id;
  }
  if (!this.updatedBy) {
    this.updatedBy = this._id;
  }
  next();
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
