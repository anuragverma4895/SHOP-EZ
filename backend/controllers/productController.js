import Product from '../models/productModel.js';

// @desc    Fetch all products with pagination, search, filter, and sort
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    // Search query
    const keyword = req.query.search
        ? {
            $text: {
                $search: req.query.search,
            },
        }
        : {};

    // Category filter
    const category = req.query.category ? { category: req.query.category } : {};

    // Sort options
    let sort = { createdAt: -1 }; // Default to newest first
    if (req.query.sort === 'priceLowToHigh') sort = { price: 1 };
    else if (req.query.sort === 'priceHighToLow') sort = { price: -1 };
    else if (req.query.sort === 'newest') sort = { createdAt: -1 };
    else if (req.query.sort === 'popular') sort = { salesCount: -1 };

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
        .sort(sort)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Increment views count (this logic could be extended or handled separately for AI tracking)
        product.viewsCount += 1;
        await product.save();
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name || 'Sample name',
        price: req.body.price || 0,
        user: req.user._id,
        image: req.body.image || '/images/sample.jpg',
        brand: req.body.brand || 'Sample brand',
        category: req.body.category || 'Sample category',
        countInStock: req.body.countInStock || 0,
        numReviews: 0,
        description: req.body.description || 'Sample description',
        discountPrice: req.body.discountPrice || 0,
        tags: req.body.tags || [],
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        discountPrice,
        tags,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.discountPrice = discountPrice || product.discountPrice;
        product.tags = tags || product.tags;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400).json({ message: 'Product already reviewed' });
            return;
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
};
