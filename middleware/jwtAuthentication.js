require("dotenv").config();
const jwt = require("jsonwebtoken");

const logger = require("../wrapper/logger");

const authenticateToken = (role = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
      logger.error("Access denied", token);
      console.log(token);
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      logger.info("Request received", req.user);

      //authenticateToken(["super_admin"])
      //authenticateToken(["super_admin","admin_user"])
      //authenticateToken(["partner_admin"])

      // Check if users role
      if (!role.includes(req.user.role)) {
        logger.error("Access denied", role);
        console.log(token, req.user);
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      logger.error(`Invalid or expire Token ${error}`);
      res.status(401).json({ message: `Invalid or expire Token ${error}` });
    }
  };
};

module.exports = authenticateToken;
