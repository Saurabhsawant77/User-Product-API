const { getAllRoles } = require("../services/role");

const handleGetAllRoles = async (req, res) => {
  try {
    const getRoles = await getAllRoles();
    if (!getRoles) {
      return res.status(404).json({ message: "No roles found" });
    }
    res
      .status(200)
      .json({ message: "Roles fetched successfully", roles: getRoles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  handleGetAllRoles,
};
