const Merchant = require("../models/Merchant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d81ff9a54f3fd8",
    pass: "79f954ae6442c1"
  }
});
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Create a new merchant
exports.MerchantSignUp = async (req, res) => {
  try {
    const { name, phoneNo, alternatePhoneNo, email, password } = req.body;

    if (!name || !phoneNo || !email || !password) {
      return res.status(202).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    const existingMerchant = await Merchant.findOne({ email });
    if (existingMerchant) {
      return res.status(202).json({
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

// Reset password for merchant
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!email || !otp || !password || !confirmPassword) {
      return res.status(202).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    // Find the merchant by email
    const merchant = await Merchant.findOne({ email });

    // Check if the merchant exists
    if (!merchant) {
      return res.status(202).json({
        success: false,
        message: "Merchant not found",
      });
    }

    // Check if the OTP matches
    if (merchant.otp !== otp) {
      return res.status(202).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check if the OTP has expired
    if (Date.now() > merchant.otpExpires) {
      return res.status(202).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Check if the new password matches the confirmation password
    if (password !== confirmPassword) {
      return res.status(202).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the merchant's password
    merchant.password = hashedPassword;

    // Clear the OTP and OTP expiration time
    merchant.otp = undefined;
    merchant.otpExpires = undefined;

    // Save the updated merchant
    await merchant.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
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
      role: "merchant",
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

// Forget password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const merchant = await Merchant.findOne({ email });
    if (!merchant) {
      return res.status(202).json({
        success: false,
        message: "Merchant not found",
      });
    }

    // Generate a 4-digit OTP
    const otp = generateOtp();
    const otpExpires = Date.now() + 3600000; // 1 hour from now

    // Save the OTP and its expiration time to the merchant document
    merchant.otp = otp;
    merchant.otpExpires = otpExpires;
    await merchant.save();

    // Configure the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: merchant.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 1 hour.`,
    };

    // Send the email using transport.sendMail
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Error sending OTP",
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({
          success: true,
          message: "OTP sent to your email",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error sending OTP",
    });
  }
};

// Get merchant by ID
exports.getMerchantProfile = async (req, res) => {
  try {
    const merchantId = req.merchantId;
    const merchant = await Merchant.findById(merchantId);
    // .populate('product_id').populate('address_id')
    if (!merchant) {
      return res.status(202).json({
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

    if (!name || !phoneNo) {
      return res.status(202).json({
        success: false,
        message: "Please provide name and phone number",
      });
    }

    const updatedData = { name, phoneNo, alternatePhoneNo };

    const merchant = await Merchant.findByIdAndUpdate(merchantId, updatedData, {
      new: true,
    });

    if (!merchant) {
      return res.status(202).json({
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
//             return res.status(202).json({
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
