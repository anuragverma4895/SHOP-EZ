import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { productId, qty, size } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        // Create new cart for user
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
        });
    }

    // Check if item already exists in cart with same size
    const existingItem = cart.cartItems.find(
        (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.cartItems.push({
            product: productId,
            name: product.name,
            image: product.image,
            price: product.price,
            qty,
            size,
        });
    }

    await cart.save();
    res.status(200).json(cart);
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        res.json(cart);
    } else {
        res.json({ cartItems: [] });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(
            (item) => item._id.toString() !== req.params.itemId
        );

        await cart.save();
        res.status(200).json(cart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

export { addToCart, getCart, removeFromCart };
