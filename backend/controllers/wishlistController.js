import Wishlist from '../models/wishlistModel.js';
import Product from '../models/productModel.js';

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: req.user._id,
            products: [],
        });
    }

    if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
    }

    res.status(200).json(wishlist);
};

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

    if (wishlist) {
        res.json(wishlist);
    } else {
        res.json({ products: [] });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== req.params.productId
        );
        await wishlist.save();
        res.status(200).json(wishlist);
    } else {
        res.status(404).json({ message: 'Wishlist not found' });
    }
};

export { addToWishlist, getWishlist, removeFromWishlist };
