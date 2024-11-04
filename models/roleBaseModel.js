const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "customer_user",
      enum: ["super_admin", "admin_user", "partner_admin", "customer_user"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    profileImage: {
      type: String,
      default: "../images/default-profile-picture.jpg",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
  User,
};
