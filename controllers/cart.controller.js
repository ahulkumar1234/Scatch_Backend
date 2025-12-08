const Cart = require('../models/cart.model');



const addtoCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    // If cart does not exist
    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity: 1 }]
        });
    } else {
        // If cart exists
        const product = cart.items.find(i => i.productId == productId);
        if (product) {
            product.quantity = quantity + 1; // already exists → increase quantity
        } else {
            cart.items.push({ productId, quantity: 1 }); // new product add
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Added to cart",
            cartData: cart
        })
    }
}

const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("items.productId"); //populate() ye karta hai: //➡ ProductId se Product collection me jaake //➡ Full product ka data lekar aa jata hai

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                items: []
            });
        }

        res.status(200).json({
            success: true,
            Cartitems: cart.items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = { addtoCart, getCartItems };


// 🤝 Ek sentence me poora summary

// Agar user ka cart pehli baar ban raha ho to cart create karo,
// agar cart already ho to agar product pehle se hai quantity badhao,
// nahi hai to naya product add karo