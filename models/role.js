const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  role_type: {
    type: String,
    required: true,
  },
  role_name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
