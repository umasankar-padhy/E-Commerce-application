const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");
const {
   
    MerchantSignUp,
    getMerchantProfile,
    updateMerchantProfile,
    merchantLogin,
    // deleteMerchant
} = require("../controllers/merchantController");

router.post("/signup", MerchantSignUp);
router.post("/login", merchantLogin);
router.get("/getProfile", requireSignIn, getMerchantProfile); 
router.put("/updateProfile", requireSignIn, updateMerchantProfile); 
// router.delete("/delete/:id", requireSignIn, deleteMerchant); 

module.exports = router;
