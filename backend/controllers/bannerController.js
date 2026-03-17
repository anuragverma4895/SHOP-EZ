import Banner from '../models/bannerModel.js';

// @desc    Fetch all banners
// @route   GET /api/banners
// @access  Private/Admin
const getBanners = async (req, res) => {
    const banners = await Banner.find({});
    res.json(banners);
};

// @desc    Fetch active banners
// @route   GET /api/banners/active
// @access  Public
const getActiveBanners = async (req, res) => {
    const banners = await Banner.find({ isActive: true });
    res.json(banners);
};

// @desc    Create a banner
// @route   POST /api/banners
// @access  Private/Admin
const createBanner = async (req, res) => {
    const { title, image, isActive } = req.body;

    const banner = new Banner({
        title: title || 'New Banner',
        image: image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        isActive: isActive !== undefined ? isActive : true,
        user: req.user ? req.user._id : req.user,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
};

// @desc    Update a banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
const updateBanner = async (req, res) => {
    const { title, image, isActive } = req.body;

    const banner = await Banner.findById(req.params.id);

    if (banner) {
        banner.title = title || banner.title;
        banner.image = image || banner.image;
        if (isActive !== undefined) {
            banner.isActive = isActive;
        }

        const updatedBanner = await banner.save();
        res.json(updatedBanner);
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
};

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
const deleteBanner = async (req, res) => {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
        await Banner.deleteOne({ _id: banner._id });
        res.json({ message: 'Banner removed' });
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
};

export { getBanners, getActiveBanners, createBanner, updateBanner, deleteBanner };
