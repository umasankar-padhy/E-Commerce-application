const express = require("express");
const router = express.Router();

const { createAddress,  updateAddress, deleteAddress, getAddressById, getAddressByAuthId } = require("../controllers/addressController");
const { requireSignIn } = require("../middleware/authMiddleware");

router.post("/create", requireSignIn, createAddress);
router.get("/get/:id", requireSignIn, getAddressById);
router.get("/getByAuth", requireSignIn, getAddressByAuthId);
router.put("/update/:id", requireSignIn, updateAddress);
router.delete("/delete/:id", requireSignIn, deleteAddress);

module.exports = router;
