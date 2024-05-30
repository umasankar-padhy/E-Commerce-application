const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");
const {
    MerchantSignUp,
    getMerchantProfile,
    updateMerchantProfile,
    merchantLogin,
    forgotPassword,
    resetPassword,
} = require("../controllers/merchantController");

router.post("/signup", MerchantSignUp);
router.post("/login", merchantLogin);
router.post("/forgot-password", forgotPassword);
router.get("/getProfile", requireSignIn, getMerchantProfile); 
router.put("/updateProfile", requireSignIn, updateMerchantProfile);
router.post("/reset-password", resetPassword); 

module.exports = router;