const Role = require("../models/role");

const getAllRoles = async () => {
  return await Role.find({});
};

module.exports = {
  getAllRoles,
};
