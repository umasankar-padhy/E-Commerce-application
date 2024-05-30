const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token || token === "undefined") {
      return res.status(401).json({
        success: false,
        message: "Token is missing or undefined",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      if (payload.role === "user") {
        req.userId = payload.id;
      } else if (payload.role === "merchant") {
        req.merchantId = payload.id;
      } else {
        return res.status(401).json({
          success: false,
          message: "Token role is invalid",
        });
      }
      
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the token",
      error: error.message,
    });
  }
};
