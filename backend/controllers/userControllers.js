const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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



//controller for new user registration
exports.signup = async (req, res) => {
    try {

        const { email, name, password, phoneNo } = req.body;
        if (!email || !name || !password || !phoneNo) {
            return res.status(200).json({
                success: false,
                message: "Please fill in all the details carefully",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exists",
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
        const user = await User.create({
            email,
            name,
            password: hashPassword,
            phoneNo
        });
        return res.status(201).json({
            success: true,
            data: user,
            message: "User created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User couldn't be registered. Please try again later.",
        });
    }
};



//controller for checking user is registered or not in every click
exports.signupcheck = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists",
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while checking user ID",
        });
    }
};




// controller for login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                message: "Please fill in all the details carefully",
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(201).json({
                success: false,
                message: "User is not registered",
            });
        }
        const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
            role: "user"
        };
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "12d",
            });
            // // Attach the token to the user object (for response) and set a cookie with the token
            // user = user.toObject();
            // user.token = token;
            // user.password = password;

            // // Configure cookie options
            // const options = {
            //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiration time (3 days)
            //     httpOnly: true, // Cookie is only accessible via HTTP
            // };

            // // Set the "token" cookie and return a success response with the token and user data
            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "User logged in successfully",
            // });
            return res.status(200).json({
                success: true,
                token: token,
                email: user.email,
                role: "user",
                message: "User logged in successfully",
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
            message: "User couldn't be logged in. Please try again later.",
        });
    }
};



// controller for get user profiles by user id through token

exports.getProfile = async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);

        if (!user) {
            return res.status(202).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "User profile retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving user profile",
        });
    }
};

// controller for update user profiles by user id through token


exports.updateProfile = async (req, res) => {
    try {
        const id = req.userId;
        const { name, phoneNo, alternatePhoneNo } = req.body;

        if (!name || !phoneNo) {
            return res.status(202).json({
                success: false,
                message: "Please provide name and phone number",
            });
        }

        const user = await User.findOneAndUpdate(
            { _id: id },
            { name, phoneNo, alternatePhoneNo },
            { new: true }
        );

        if (!user) {
            return res.status(202).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "User profile updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating user profile",
        });
    }
};






// Reset password for user
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

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(202).json({
                success: false,
                message: "user not found",
            });
        }

        // Check if the OTP matches
        if (user.otp !== otp) {
            return res.status(202).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Check if the OTP has expired
        if (Date.now() > user.otpExpires) {
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

        // Update the user's password
        user.password = hashedPassword;

        // Clear the OTP and OTP expiration time
        user.otp = undefined;
        user.otpExpires = undefined;

        // Save the updated user
        await user.save();

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
// Forget password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(202).json({
                success: false,
                message: "user not found",
            });
        }

        // Generate a 4-digit OTP
        const otp = generateOtp();
        const otpExpires = Date.now() + 3600000; // 1 hour from now

        // Save the OTP and its expiration time to the user document
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Configure the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
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
