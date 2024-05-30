const Merchant = require("../models/Merchant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new merchant
exports.MerchantSignUp = async (req, res) => {
    try {
        const { name, phoneNo, alternatePhoneNo, email, password } = req.body;

        if (!name || !phoneNo || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details",
            });
        }

        const existingMerchant = await Merchant.findOne({ email });
        if (existingMerchant) {
            return res.status(400).json({
                success: false,
                message: "Merchant already exists",
            });
        }
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }
        const merchant = await Merchant.create({
            name,
            phoneNo,
            alternatePhoneNo,
            email,
            password: hashPassword, 
        });

        return res.status(201).json({
            success: true,
            data: merchant,
            message: "Merchant created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating merchant",
        });
    }
};


// controller for login
exports.merchantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                message: "Please fill in all the details carefully",
            });
        }
        let merchant = await Merchant.findOne({ email });
        if (!merchant) {
            return res.status(201).json({
                success: false,
                message: "merchant is not registered",
            });
        }
        const payload = {
            email: merchant.email,
            id: merchant._id,
            role: "merchant"
        };
        if (await bcrypt.compare(password, merchant.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            // // Attach the token to the merchant object (for response) and set a cookie with the token
            // merchant = merchant.toObject();
            // merchant.token = token;
            // merchant.password = password;

            // // Configure cookie options
            // const options = {
            //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiration time (3 days)
            //     httpOnly: true, // Cookie is only accessible via HTTP
            // };

            // // Set the "token" cookie and return a success response with the token and merchant data
            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     merchant,
            //     message: "merchant logged in successfully",
            // });
            return res.status(200).json({
                success: true,
                token: token,
                email: merchant.email,
                message: "merchant logged in successfully",
            });
        } else {
            return res.status(203).json({
                success: false,
                message: "Password incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "merchant couldn't be logged in. Please try again later.",
        });
    }
};


// Get merchant by ID
exports.getMerchantProfile = async (req, res) => {
    try {
        const merchantId = req.merchantId;
        const merchant = await Merchant.findById(merchantId)
        // .populate('product_id').populate('address_id')
        ;

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: merchant,
            message: "Merchant profile retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving merchant profile",
        });
    }
};

// Update merchant details
exports.updateMerchantProfile = async (req, res) => {
    try {
        const merchantId = req.merchantId;
        const { name, phoneNo, alternatePhoneNo } = req.body;

        if (!name || !phoneNo ) {
            return res.status(400).json({
                success: false,
                message: "Please provide name and phone number",
            });
        }

        const updatedData = { name, phoneNo, alternatePhoneNo };
       

        const merchant = await Merchant.findByIdAndUpdate(merchantId, updatedData, { new: true });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: merchant,
            message: "Merchant profile updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating merchant profile",
        });
    }
};
//NEED TO CHECK??????
// // Delete merchant
// exports.deleteMerchant = async (req, res) => {
//     try {
//         const merchantId = req.params.id;
//         const merchant = await Merchant.findByIdAndDelete(merchantId);

//         if (!merchant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Merchant not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Merchant deleted successfully",
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Error deleting merchant",
//         });
//     }
// };
