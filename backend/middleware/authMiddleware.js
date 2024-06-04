const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.requireSignIn = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "") || req.headers.authorization;


    if (!token || token === undefined) {
      return res.status(202).json({
        success: false,
        Message: "Token missing",
      });
    }


    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role === "user")
        req.userId = payload.id;
      req.user = payload.name;
      if (payload.role === "merchant")
        req.merchantId = payload.id;
      // console.log(req.userId)
      // console.log(req.merchantId)
    } catch (error) {

      return res.status(202).json({
        success: false,
        Message: "Token is invalid",
      });
    }



    next();
  } catch (error) {

    return res.status(202).json({
      success: false,
      Message: "Something went wrong while verifying the token",
      error: error.message,
    });
  }
};