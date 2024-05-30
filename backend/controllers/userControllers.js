const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//controller for new user registration
exports.signup = async (req, res) => {
    try {

        const { email, name, password, phoneNo } = req.body;
        if (!email || !name || !password ||  !phoneNo) {
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
            email: user.email,
            id: user._id,
            role:"user"
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
            return res.status(404).json({
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
        const { name, phoneNo,alternatePhoneNo } = req.body;

        if (!name || !phoneNo ) {
            return res.status(400).json({
                success: false,
                message: "Please provide name and phone number",
            });
        }

        const user = await User.findOneAndUpdate(
            { _id:id },
            { name, phoneNo , alternatePhoneNo},
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
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
