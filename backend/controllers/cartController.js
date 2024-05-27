// // // const Cart = require('../models/Cart');
// // // const Product = require('../models/Product');
// // // const User = require('../models/User');

// // // // Add a product to the cart
// // // exports.addToCart = async (req, res) => {
// // //     try {
// // //         const userId = req.userId;
// // //         const { productId, quantity } = req.body;
// // //             // , size, color


// // //         const product = await Product.findById(productId);
// // //         if (!product) {
// // //             return res.status(204).json({
// // //                 success: false,
// // //                 message: 'Product not found'
// // //             });
// // //         }

// // //         let cart = await Cart.findOne({ user_id: userId });
// // //         if (!cart) {
// // //             cart = new Cart({
// // //                 user_id: userId,
// // //                 cartSummary: [],
// // //                 total: 0
// // //             });

// // //         }

// // //         const existingProductIndex = cart.cartSummary.findIndex(item => item.product_id.toString() === productId);
// // //         if (existingProductIndex >= 0) {
// // //             cart.cartSummary[existingProductIndex].quantity = parseInt(cart.cartSummary[existingProductIndex].quantity) + parseInt(quantity);
// // //             cart.cartSummary[existingProductIndex].price = parseInt(product.price);
// // //             // cart.cartSummary[existingProductIndex].size = size || cart.cartSummary[existingProductIndex].size;
// // //             // cart.cartSummary[existingProductIndex].color = color || cart.cartSummary[existingProductIndex].color;
// // //         } else {
// // //             const cartItem = {
// // //                 product_id: productId,
// // //                 price: product.price,
// // //                 quantity,
// // //                 // size,
// // //                 // color,
// // //                 isAdded: falsee,
// // //                 isOrdered: false
// // //             };
// // //             cart.cartSummary.push(cartItem);
// // //         }

// // //         cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

// // //         await cart.save();

// // //         const updateUser = await User.findByIdAndUpdate(req.userId,  {cart_id: cart._id }, { new: true })
// // //             .populate({
// // //                 path: 'cart_id',
// // //                 populate: {
// // //                     path: 'cartSummary.product_id'
// // //                 }
// // //             }).exec();



// // //         res.status(200).json({
// // //             success: true,
// // //             data: cart,
// // //             userDetails:updateUser,
// // //             message: 'Product added to cart successfully'
// // //         });
// // //     } catch (error) {
// // //         console.error(error);
// // //         res.status(500).json({
// // //             success: false,
// // //             message: 'Error adding product to cart'
// // //         });
// // //     }
// // // };

// // // // Get user's cart
// // // exports.getCart = async (req, res) => {
// // //     try {
// // //         const userId = req.userId;
// // //         const cart = await Cart.findOne({ user_id: userId }).populate('cartSummary.product_id');

// // //         if (!cart) {
// // //             return res.status(204).json({
// // //                 success: false,
// // //                 message: 'Cart not found'
// // //             });
// // //         }

// // //         res.status(200).json({
// // //             success: true,
// // //             data: cart,
// // //             message: 'Cart found successfully'
// // //         });
// // //     } catch (error) {
// // //         console.error(error);
// // //         res.status(500).json({
// // //             success: false,
// // //             message: 'Error fetching cart'
// // //         });
// // //     }
// // // };

// // // // Update cart item
// // // exports.updateCartItem = async (req, res) => {
// // //     // try {
// // //     //     const userId = req.userId;
// // //     //     const { productId, quantity, size, color } = req.body;

// // //     //     let cart = await Cart.findOne({ user_id: userId });
// // //     //     if (!cart) {
// // //     //         return res.status(204).json({
// // //     //             success: false,
// // //     //             message: 'Cart not found'
// // //     //         });
// // //     //     }

// // //     //     const cartItem = cart.cartSummary.find(item => item.product_id.toString() === productId);
// // //     //     if (!cartItem) {
// // //     //         return res.status(204).json({
// // //     //             success: false,
// // //     //             message: 'Product not found in cart'
// // //     //         });
// // //     //     }

// // //     //     if (quantity !== undefined) cartItem.quantity = quantity;
// // //     //     if (size !== undefined) cartItem.size = size;
// // //     //     if (color !== undefined) cartItem.color = color;

// // //     //     cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

// // //     //     await cart.save();

// // //     //     res.status(200).json({
// // //     //         success: true,
// // //     //         data: cart,
// // //     //         message: 'Cart item updated successfully'
// // //     //     });
// // //     // } catch (error) {
// // //     //     console.error(error);
// // //     //     res.status(500).json({
// // //     //         success: false,
// // //     //         message: 'Error updating cart item'
// // //     //     });
// // //     // }
// // // };

// // // // Remove product from cart
// // // exports.removeFromCart = async (req, res) => {
// // //     try {
// // //         const userId = req.userId;
// // //         const { productId } = req.body;

// // //         if (!productId) {
// // //             return res.status(202).json({
// // //                 success: false,
// // //                 message: 'provide product id'
// // //             });
// // // }
// // //         let cart = await Cart.findOne({ user_id: userId });
// // //         if (!cart) {
// // //             return res.status(204).json({
// // //                 success: false,
// // //                 message: 'Cart not found'
// // //             });
// // //         }

// // //         cart.cartSummary = cart.cartSummary.filter(item => item.product_id.toString() !== productId);
// // //         cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

// // //         await cart.save();

// // //         res.status(200).json({
// // //             success: true,
// // //             data: cart,
// // //             message: 'Product removed from cart successfully'
// // //         });
// // //     } catch (error) {
// // //         console.error(error);
// // //         res.status(500).json({
// // //             success: false,
// // //             message: 'Error removing product from cart'
// // //         });
// // //     }
// // // };











// // const Cart = require('../models/Cart');
// // const Product = require('../models/Product');
// // const User = require('../models/User');
// // // Create a new cart item
// // exports.createCart = async (req, res) => {
// //   try {
// //     const userId = req.userId;
// //     const {  product_id, quantity, size, color}  = req.body;
// //       const product = await Product.findById(productId);
// //               if (!product) {
// //                   return res.status(204).json({
// //                       success: false,
// //                       message: 'Product not found'
// //                   });
// //               }
// //     const newCart = new Cart({
// //       userId,
// //       product_id,
// //       quantity,
// //       size,
// //       color,
      
// //     });
// //     const savedCart = await newCart.save();
// //     res.status(201).json(savedCart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // Get all cart items
// // exports.getAllCarts = async (req, res) => {
// //   try {
// //     const carts = await Cart.find();
// //     res.status(200).json(carts);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // Get a single cart item by ID
// // exports.getCartById = async (req, res) => {
// //   try {
// //     const cart = await Cart.findById(req.params.id);
// //     if (!cart) {
// //       return res.status(204).json({ message: 'Cart not found' });
// //     }
// //     res.status(200).json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // Update a cart item by ID
// // exports.updateCartById = async (req, res) => {
// //   try {
// //     const { user_id, product_id, address_id, quantity, size, color, isAdded, falsedered, orderDate, isDelivered, isCancelled, isReturned } = req.body;
// //     const updatedCart = await Cart.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         user_id,
// //         product_id,
// //         address_id,
// //         quantity,
// //         size,
// //         color,
// //         isAdded,
// false       isOrdered,
// //         orderDate,
// //         isDelivered,
// //         isCancelled,
// //         isReturned
// //       },
// //       { new: true }
// //     );
// //     if (!updatedCart) {
// //       return res.status(204).json({ message: 'Cart not found' });
// //     }
// //     res.status(200).json(updatedCart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // Delete a cart item by ID
// // exports.deleteCartById = async (req, res) => {
// //   try {
// //     const deletedCart = await Cart.findByIdAndDelete(req.params.id);
// //     if (!deletedCart) {
// //       return res.status(204).json({ message: 'Cart not found' });
// //     }
// //     res.status(200).json({ message: 'Cart deleted' });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };






const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id, quantity, size, color } = req.body;

        // Validate required fields
        if (!product_id || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        // Find the product
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(204).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if the product is already in the cart
        // let cart = await Cart.findOne({ user_id: userId, product_id });
        // if (cart) {
        //     cart.quantity += parseInt(quantity);
        //     cart.size = size || cart.size;
        //     cart.color = color || cart.color;
        // } else {
        //     // Create a new cart item
          const  cart = new Cart({
                user_id: userId,
                product_id,
                quantity,
                size,
                color,
                // orderDate: new Date()
            });
        // }

        // Save the cart item
        const savedCart = await cart.save();

        // Update the user's cart IDs array
        const user = await User.findById(userId);
        // if (!user.cart_id.includes(savedCart._id)) {
            user.cart_id.push(savedCart._id);
            await user.save();
        // }
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(201).json({
            success: true,
            data: getCart,

            message: 'Product added to cart successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding product to cart'
        });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.find({ user_id: userId ,isOrdered:false}).populate('product_id');

        if (!cart ) {
            return res.status(204).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart found successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart'
        });
    }
};

// Update a cart item by ID
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id, quantity, size, color } = req.body;

        // Validate required fields
        if (!product_id || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        // Find the product
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(204).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await Cart.findOne({ user_id: userId, product_id ,isOrdered:false});
        if (!cart) {
            return res.status(204).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        cart.quantity += parseInt(quantity);
        cart.size = size || cart.size;
        cart.color = color || cart.color;
        cart.isAdded =true ; 
        const updatedCart = await cart.save();
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(200).json({
            success: true,
            data: getCart,
            message: 'Cart item updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item'
        });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }
        // isAdded: false
        // const cart = await Cart.findOneAndUpdate({ user_id: userId, product_id: product_id ,isOrdered:false},{isAdded: !isAdded});
     //  // // const cart = await Cart.findOne({ user_id: userId, product_id: product_id ,isOrdered:false});
        const cart = await Cart.findOneAndDelete({ user_id: userId, product_id: product_id ,isOrdered:false});

        if (!cart) {
            return res.status(204).json({
                success: false,
                message: 'Cart item not found'
            });
        }
     //  // // cart.isAdded=!cart.isAdded;
     //  // // await cart.save();
        const user = await User.findById(userId);
        // if (!user.cart_id.includes(savedCart._id)) {
        user.cart_id.pull(cart._id);
        await user.save();
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(200).json({
            success: true,
            data:getCart,
            message: 'Product removed from cart successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error removing product from cart'
        });
    }
};
