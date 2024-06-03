const express = require("express");
const router = express.Router();

const { login, signup, signupcheck, getProfile, updateProfile, forgotPassword, resetPassword } = require("../controllers/userControllers");
const { requireSignIn } = require("../middleware/authMiddleware");


router.post("/login", login);
router.post("/signup", signup);
router.post("/signupcheck", signupcheck);

router.get("/getProfile", requireSignIn, getProfile); 
router.put("/updateProfile", requireSignIn, updateProfile); 
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword); 

module.exports = router; 
