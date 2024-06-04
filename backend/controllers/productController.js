const Product = require("../models/Product");
const Merchant = require("../models/Merchant");
const cloudinary = require("cloudinary").v2;
const Comment = require("../models/Comment");


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Function to upload a file to Cloudinary with retry logic
async function uploadFileToCloudinary(file, folder, quality, retryCount = 5) {
    const date = new Date()
    const options = {
        folder: folder,
        resource_type: "auto",
        public_id: `${file.name}_${date.toISOString().replace(/:/g, '-').replace(/\..+/, '')}`,
        use_filename: true,
        unique_filename: true
    };

    if (quality) {
        options.quality = quality;
    }

    for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
            return await cloudinary.uploader.upload(file.tempFilePath, options);
        } catch (error) {
            if (attempt < retryCount) {
                console.error(`Upload attempt ${attempt} failed. Retrying...`);
            } else {
                console.error(`All ${retryCount} upload attempts failed.`);
                throw error;
            }
        }
    }
}


// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, imageUrl, price, quantity, size, color, isActive, MFG_Date, EXP_Date, productId, brand, category, rating } = req.body;

        // Check if the merchant exists
        const merchant = await Merchant.findById(req.merchantId);
        if (!merchant) {
            return res.status(202).json({
                success: false,
                message: "Merchant not found",
            });
        }

        // Check for required fields
        if (!title || !price || !quantity || !MFG_Date || !EXP_Date || !brand || !category) {
            return res.status(202).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        // Check data types and constraints
        // if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof quantity !== 'number' ||
        //     typeof size !== 'string' || typeof color !== 'string' || typeof isActive !== 'boolean' ||
        //     // !(MFG_Date instanceof Date) || !(EXP_Date instanceof Date) || typeof productId !== 'string' ||
        //     typeof brand !== 'string' || typeof category !== 'string' || typeof rating !== 'number') {
        //     return res.status(202).json({
        //         success: false,
        //         message: "Invalid data types or constraints",
        //     });
        // }

        // Validate dates
        if (MFG_Date >= EXP_Date) {
            return res.status(202).json({
                success: false,
                message: "Manufacturing date must be before expiration date",
            });
        }

        let files = req?.files?.images;

        if (!Array.isArray(files)) {
            files = [files];
        }
        // Validate images
        if (!req?.files?.images) {
            return res.status(202).json({
                success: false,
                message: "Images are required",
            });
        }


        const imageUrls = [];
        const supportedTypes = ["jpg", "jpeg", "png"];
        const maxFileSize = 1 * 1024 * 1024; // 10 MB (adjust as needed)

        for (const file of files) {
            const format = file?.name.split(".");
            const fileType = format[format?.length - 1].toLowerCase();
            const fileSize = file.size; // Size in bytes

            // Validate file format
            if (!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(202).json({
                    success: false,
                    message: `File format not supported (jpg, jpeg, png) : ${file.name}`,
                });
            }

            // Optionally validate file size
            if (fileSize > maxFileSize) {
                return res.status(202).json({
                    success: false,
                    message: `File size exceeds the limit 1 MB: ${file.name}`,
                });
            }

            // const response = await uploadFileToCloudinary(file, "E_COMMERCE");
            // imageUrls.push(response.secure_url);
            try {
                const response = await uploadFileToCloudinary(file, "E_COMMERCE");
                imageUrls.push(response.secure_url);
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: `Error uploading file: ${file.name}`,
                    error: error.message
                });
            }
        }

        // Create new product
        const product = await Product.create({
            title,
            description,
            imageUrl: imageUrls,
            price,
            quantity,
            size,
            color,
            isActive,
            merchant_id: req.merchantId,
            MFG_Date,
            EXP_Date,
            productId,
            brand,
            category,
            rating
        });

        const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $push: { product_id: product._id } }, { new: true }).populate("product_id").exec();

        return res.status(201).json({
            success: true,
            data: product,
            merchantDetails: updatemerchant,
            message: "Product created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating product",
        });
    }
};

// Get all products 
exports.getProduct = async (req, res) => {
    try {
        // const productId = req.params.id;
        const products = await Product.find().populate('merchant_id', 'name email');

        if (!products) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving product",
        });
    }
};

// // Get product by ID
// exports.getProductById = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await Product.findById(productId).populate('merchant_id', 'name email');

//         if (!product) {
//             return res.status(202).json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: product,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Error retrieving product",
//         });
//     }
// };

exports.getProductByMerchant = async (req, res) => {
    try {
        // const productId = req.params.id;
        const products = await Product.find({ merchant_id: req.merchantId }).populate('merchant_id', 'name email');

        if (!products) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving product",
        });
    }
};
// Update product

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, price, quantity, size, color, isActive, MFG_Date, EXP_Date, brand, category, rating } = req.body;
        // Check if the merchant exists
        const merchant = await Merchant.findById(req.merchantId);
        if (!merchant) {
            return res.status(202).json({
                success: false,
                message: "Merchant not found",
            });
        }
        // Check for required fields
        if (!title || !price || !quantity || !MFG_Date || !EXP_Date || !brand || !category) {
            return res.status(202).json({
                success: false,
                message: "Required fields are missing",
            });
        }
        // Validate dates
        if (MFG_Date >= EXP_Date) {
            return res.status(202).json({
                success: false,
                message: "Manufacturing date must be before expiration date",
            });
        }
        let files = req?.files?.images; // Assume 'images' field contains the images

        // Find the existing product
        const existingProduct = await Product.findOne({ _id: productId, merchant_id: req.merchantId });

        if (!existingProduct) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }

        const imageUrls = existingProduct.imageUrl || [];
        if (files) {
            // If files is not an array, make it an array for uniform processing
            if (!Array.isArray(files)) {
                files = [files];
            }
            const supportedTypes = ["jpg", "jpeg", "png"];
            const maxFileSize = 1 * 1024 * 1024; // 10 MB (adjust as needed)

            // Validation and upload
            for (const file of files) {
                const format = file?.name.split(".");
                const fileType = format[format?.length - 1].toLowerCase();
                const fileSize = file.size; // Size in bytes
                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(202).json({
                        success: false,
                        message: `File format not supported (jpg, jpeg, png) : ${file.name}`,
                    });
                }
                // Optionally validate file size
                if (fileSize > maxFileSize) {
                    return res.status(202).json({
                        success: false,
                        message: `File size exceeds the limit 1 MB: ${file.name}`,
                    });
                }
                // // Upload to Cloudinary
                // const response = await uploadFileToCloudinary(file, "E_COMMERCE");
                // imageUrls.push(response.secure_url);

                // Upload to Cloudinary
                try {
                    const response = await uploadFileToCloudinary(file, "E_COMMERCE");
                    imageUrls.push(response.secure_url);
                } catch (error) {
                    return res.status(500).json({
                        success: false,
                        message: `Error uploading file: ${file.name}`,
                        error: error.message
                    });
                }
            }
        }

        // Update the product
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId, merchant_id: req.merchantId }, {
            title,
            description,
            imageUrl: imageUrls, // Updated imageUrl array
            price,
            quantity,
            size,
            color,
            isActive,
            MFG_Date,
            EXP_Date,
            brand,
            category,
            rating
        }, { new: true });

        return res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating product",
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOneAndDelete({ _id: productId, merchant_id: req.merchantId });

        if (!product) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }
        const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $pull: { product_id: product._id } }, { new: true })
            .populate("product_id").exec();
        return res.status(200).json({
            success: true,
            merchantDetails: updatemerchant,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting product",
        });
    }
};





// Delete product
exports.deleteImage = async (req, res) => {
    try {
        const productId = req.params.id;
        const { imageUrl } = req.body;

        const product = await Product.findOneAndUpdate({ _id: productId, merchant_id: req.merchantId, imageUrl: imageUrl }, { $pull: { imageUrl: imageUrl } }, { new: true });

        if (!product) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product: product,
            message: "image deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting image",
        });
    }
};






const populateCommentsRecursively = async (comment) => {
    if (!comment.comment_ids || comment.comment_ids.length === 0) {
        return comment;
    }

    // Populate the nested comments
    comment.comment_ids = await Comment.find({ _id: { $in: comment.comment_ids } }).lean();

    // Recursively populate for each nested comment
    for (let i = 0; i < comment.comment_ids.length; i++) {
        comment.comment_ids[i] = await populateCommentsRecursively(comment.comment_ids[i]);
    }

    return comment;
};

const populateProductComments = async (productId) => {
    try {
        // Fetch the product by ID and populate the comment_ids field with actual comments
        const product = await Product.findById(productId).populate('comment_ids').lean();

        // If product not found, return null
        if (!product) {
            return null;
        }

        // Recursively populate the comments if comment_ids exist
        if (product.comment_ids && product.comment_ids.length > 0) {
            for (let i = 0; i < product.comment_ids.length; i++) {
                product.comment_ids[i] = await populateCommentsRecursively(product.comment_ids[i]);
            }
        }

        return product;
    } catch (error) {
        throw new Error("Error populating product comments: " + error.message);
    }
};
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await populateProductComments(productId);

        if (!product) {
            return res.status(202).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving product",
        });
    }
};
