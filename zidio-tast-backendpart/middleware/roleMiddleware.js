// middleware/roleMiddleware.js
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }
      return res.status(403).json({ message: "Access denied" });
    };
  };
  
  module.exports = checkRole;
  