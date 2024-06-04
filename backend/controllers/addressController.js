const Address = require("../models/Address");
const User = require("../models/User");
const Merchant = require("../models/Merchant");

// create anew address of user as well as merchant
exports.createAddress = async (req, res) => {
    try {

        const { houseNo, streetName, city, district, state, country, pin } = req.body;

        if (!houseNo || !streetName || !city || !district || !state || !country || !pin) {
            return res.status(202).json({
                success: false,
                message: "Please provide all address details",
            });
        }

        // Create address object
        const addressData = {
            houseNo,
            streetName,
            city,
            district,
            state,
            country,
            pin
        };

        if (req.userId) {
            addressData.user_id = req.userId;
        } else if (req.merchantId) {
            addressData.merchant_id = req.merchantId;
        }

        const address = await Address.create(addressData);

        if (req.userId) {
            const updateUser = await User.findByIdAndUpdate(req.userId, { $push: { address_id: address._id } }, { new: true })
                .populate("address_id").exec();
        } else if (req.merchantId) {
            const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $push: { address_id: address._id } }, { new: true })
                .populate("address_id").exec();
        }



        return res.status(201).json({
            success: true,
            data: address,
            // userDetails: updateUser,
            // merchantDetails: updatemerchant,
            message: "Address created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating address",
        });
    }
};
// controller for getting the address
// Get address by ID
exports.getAddressById = async (req, res) => {
    try {
        const addressId = req.params.id;
        const address = await Address.findById(addressId)
            .populate('user_id', 'name email')
            .populate('merchant_id', 'name email');

        if (!address) {
            return res.status(202).json({
                success: false,
                message: "Address not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving address",
        });
    }
};

// Get address by ID
exports.getAddressByAuthId = async (req, res) => {
    try {
        if (req.userId) {
            const address = await Address.find({ user_id: req.userId })
                .populate('user_id', 'name email')


            if (!address) {
                return res.status(202).json({
                    success: false,
                    message: "Address not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: address,
            });
        }
        if (req.merchantId) {
            const address = await Address.find({ merchant_id: req.merchantId })

                .populate('merchant_id', 'name email');

            if (!address) {
                return res.status(202).json({
                    success: false,
                    message: "Address not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: address,
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving address",
        });
    }
};


//controller for update address
exports.updateAddress = async (req, res) => {
    try {
        // const userId = req.userId;
        const addressId = req.params.id;
        const { houseNo, streetName, city, district, state, country, pin } = req.body;

        if (!houseNo || !streetName || !city || !district || !state || !country || !pin) {
            return res.status(202).json({
                success: false,
                message: "Please provide all address details",
            });
        }

        const address = await Address.findByIdAndUpdate(
            addressId,
            { houseNo, streetName, city, district, state, country, pin },
            { new: true }
        );

        if (!address) {
            return res.status(202).json({
                success: false,
                message: "Address not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: address,
            message: "Address updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating address",
        });
    }
};
//  controller for remove address
exports.deleteAddress = async (req, res) => {
    try {
        // const userId = req.userId;
        const addressId = req.params.id;
        const address = await Address.findByIdAndDelete(addressId);


        if (!address) {
            return res.status(202).json({
                success: false,
                message: "Address not found",
            });
        }

        if (req.userId) {
            const updateUser = await User.findByIdAndUpdate(req.userId, { $pull: { address_id: address._id } }, { new: true })
                .populate("address_id").exec();
        } else if (req.merchantId) {
            const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $pull: { address_id: address._id } }, { new: true })
                .populate("address_id").exec();
        }

        return res.status(200).json({
            success: true,
            // userDetails:updateUser,
            // merchantDetails: updatemerchant,

            message: "Address deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting address",
        });
    }
};
