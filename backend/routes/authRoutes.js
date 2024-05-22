const express = require("express");
const router = express.Router();

const { login, signup, signupcheck, getProfile, updateProfile } = require("../controllers/authControllers");
const { requireSignIn } = require("../middleware/authMiddleware");


router.post("/login", login);
router.post("/signup", signup);
router.post("/signupcheck", signupcheck);

router.get("/getProfile", requireSignIn, getProfile); // Protected route for getting user profile
router.put("/updateProfile", requireSignIn, updateProfile); // Protected route for updating user profile


module.exports = router; 
