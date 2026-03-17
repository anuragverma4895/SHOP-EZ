import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Banner from './models/bannerModel.js';
import Order from './models/orderModel.js';

dotenv.config();
connectDB();

// ──────────────── USERS ────────────────
const users = [
    {
        name: 'Admin User',
        email: 'admin@shopez.com',
        password: 'password123',
        isAdmin: true,
    },
    {
        name: 'Demo User',
        email: 'user@shopez.com',
        password: 'password123',
        isAdmin: false,
    },
];

// ──────────────── PRODUCTS ────────────────
const products = [
    {
        name: 'Apple iPhone 15 Pro Max',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
        brand: 'Apple',
        category: 'Smartphones',
        description: 'The iPhone 15 Pro Max features a titanium design, A17 Pro chip, 48MP camera system, and all-day battery life. Experience the most powerful iPhone ever made.',
        price: 134900,
        discountPrice: 129900,
        countInStock: 25,
        rating: 4.8,
        numReviews: 124,
        tags: ['apple', 'iphone', 'smartphone', 'premium'],
        salesCount: 340,
        viewsCount: 8200,
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
        brand: 'Samsung',
        category: 'Smartphones',
        description: 'Galaxy S24 Ultra with Galaxy AI, built-in S Pen, 200MP camera, and titanium frame. The ultimate smartphone experience powered by Snapdragon 8 Gen 3.',
        price: 129999,
        discountPrice: 119999,
        countInStock: 30,
        rating: 4.7,
        numReviews: 98,
        tags: ['samsung', 'galaxy', 'smartphone', 'ai'],
        salesCount: 280,
        viewsCount: 7500,
    },
    {
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&auto=format&fit=crop&q=80',
        brand: 'Sony',
        category: 'Audio',
        description: 'Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming mics. 30-hour battery life.',
        price: 29990,
        discountPrice: 24990,
        countInStock: 50,
        rating: 4.9,
        numReviews: 215,
        tags: ['sony', 'headphones', 'noise-cancelling', 'wireless'],
        salesCount: 520,
        viewsCount: 12000,
    },
    {
        name: 'MacBook Pro 16" M3 Max',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
        brand: 'Apple',
        category: 'Laptops',
        description: 'Supercharged by the M3 Max chip. With up to 128GB unified memory, blazing-fast performance for pro workflows. Stunning Liquid Retina XDR display.',
        price: 349900,
        discountPrice: 339900,
        countInStock: 12,
        rating: 4.9,
        numReviews: 67,
        tags: ['apple', 'macbook', 'laptop', 'pro'],
        salesCount: 150,
        viewsCount: 5600,
    },
    {
        name: 'Dell XPS 15 (2024)',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop&q=80',
        brand: 'Dell',
        category: 'Laptops',
        description: 'Ultra-thin InfinityEdge display, Intel Core Ultra 9, 32GB DDR5 RAM, and 1TB SSD. The perfect blend of power and elegance for professionals.',
        price: 189990,
        discountPrice: 174990,
        countInStock: 18,
        rating: 4.6,
        numReviews: 42,
        tags: ['dell', 'xps', 'laptop', 'ultrabook'],
        salesCount: 95,
        viewsCount: 3400,
    },
    {
        name: 'PlayStation 5 Slim',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&auto=format&fit=crop&q=80',
        brand: 'Sony',
        category: 'Gaming',
        description: 'Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio. The future of gaming is here.',
        price: 49990,
        discountPrice: 44990,
        countInStock: 40,
        rating: 4.8,
        numReviews: 312,
        tags: ['sony', 'playstation', 'ps5', 'gaming'],
        salesCount: 680,
        viewsCount: 15000,
    },
    {
        name: 'Apple Watch Ultra 2',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&auto=format&fit=crop&q=80',
        brand: 'Apple',
        category: 'Wearables',
        description: 'The most rugged and capable Apple Watch. Precision dual-frequency GPS, 36-hour battery life, 100m water resistance, and the brightest Always-On display.',
        price: 89900,
        discountPrice: 84900,
        countInStock: 22,
        rating: 4.7,
        numReviews: 56,
        tags: ['apple', 'watch', 'smartwatch', 'ultra'],
        salesCount: 120,
        viewsCount: 4100,
    },
    {
        name: 'Samsung 65" Neo QLED 4K TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
        brand: 'Samsung',
        category: 'Television',
        description: 'Quantum Matrix Technology with Mini LEDs delivers stunning brightness and contrast. Neural Quantum Processor 4K with AI upscaling. Dolby Atmos sound.',
        price: 164990,
        discountPrice: 149990,
        countInStock: 8,
        rating: 4.6,
        numReviews: 34,
        tags: ['samsung', 'tv', '4k', 'qled'],
        salesCount: 65,
        viewsCount: 2800,
    },
    {
        name: 'iPad Pro 12.9" M2',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
        brand: 'Apple',
        category: 'Tablets',
        description: 'Supercharged by the M2 chip. Brilliant Liquid Retina XDR display. ProRes video capture. Wi-Fi 6E. Apple Pencil hover. The ultimate iPad experience.',
        price: 112900,
        discountPrice: 104900,
        countInStock: 15,
        rating: 4.8,
        numReviews: 89,
        tags: ['apple', 'ipad', 'tablet', 'pro'],
        salesCount: 200,
        viewsCount: 6700,
    },
    {
        name: 'Bose QuietComfort Earbuds II',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&auto=format&fit=crop&q=80',
        brand: 'Bose',
        category: 'Audio',
        description: 'World-class noise cancellation personalized to you. CustomTune technology, 6 hours of battery, and immersive sound. The best earbuds for noise cancellation.',
        price: 22900,
        discountPrice: 19900,
        countInStock: 35,
        rating: 4.7,
        numReviews: 178,
        tags: ['bose', 'earbuds', 'wireless', 'noise-cancelling'],
        salesCount: 410,
        viewsCount: 9800,
    },
    {
        name: 'Canon EOS R6 Mark II',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
        brand: 'Canon',
        category: 'Cameras',
        description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K 60fps video, up to 40fps continuous shooting, and in-body image stabilization. Perfect for photo and video creators.',
        price: 219990,
        discountPrice: 199990,
        countInStock: 10,
        rating: 4.8,
        numReviews: 45,
        tags: ['canon', 'camera', 'mirrorless', 'photography'],
        salesCount: 75,
        viewsCount: 3200,
    },
    {
        name: 'Nike Air Jordan 1 Retro High OG',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80',
        brand: 'Nike',
        category: 'Footwear',
        description: 'The iconic Air Jordan 1 in the classic Chicago colorway. Premium leather upper, Air-Sole cushioning, and a rubber cupsole. A must-have for sneaker enthusiasts.',
        price: 16995,
        discountPrice: 14995,
        countInStock: 45,
        rating: 4.9,
        numReviews: 267,
        tags: ['nike', 'jordan', 'sneakers', 'footwear'],
        salesCount: 590,
        viewsCount: 14000,
    },
    {
        name: 'Dyson V15 Detect Vacuum',
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
        brand: 'Dyson',
        category: 'Home Appliances',
        description: 'Dyson\'s most powerful, intelligent cordless vacuum. Laser reveals microscopic dust, piezo sensor counts and sizes particles, and auto-adjusts suction power.',
        price: 62900,
        discountPrice: 54900,
        countInStock: 20,
        rating: 4.7,
        numReviews: 93,
        tags: ['dyson', 'vacuum', 'cordless', 'home'],
        salesCount: 180,
        viewsCount: 5100,
    },
    {
        name: 'LG 34" UltraGear Gaming Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
        brand: 'LG',
        category: 'Monitors',
        description: '34" UltraWide QHD Nano IPS display, 160Hz refresh rate, 1ms GtG, NVIDIA G-SYNC Compatible, and HDR10. The ultimate gaming monitor for immersive gameplay.',
        price: 54990,
        discountPrice: 47990,
        countInStock: 14,
        rating: 4.6,
        numReviews: 58,
        tags: ['lg', 'monitor', 'gaming', 'ultrawide'],
        salesCount: 110,
        viewsCount: 3900,
    },
    {
        name: 'Logitech MX Master 3S',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
        brand: 'Logitech',
        category: 'Accessories',
        description: 'Ultra-precise wireless mouse with MagSpeed scroll, Quiet Clicks, 8K DPI tracking on any surface, and USB-C charging. Ergonomic design for all-day comfort.',
        price: 10995,
        discountPrice: 8995,
        countInStock: 60,
        rating: 4.8,
        numReviews: 345,
        tags: ['logitech', 'mouse', 'wireless', 'ergonomic'],
        salesCount: 720,
        viewsCount: 16500,
    },
];

// ──────────────── BANNERS ────────────────
const banners = [
    {
        title: 'Mega Summer Sale — Up to 50% Off!',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        isActive: true,
    },
    {
        title: 'New Arrivals in Tech',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        isActive: true,
    },
    {
        title: 'Premium Audio Collection',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        isActive: true,
    },
];

// ──────────────── IMPORT / DESTROY ────────────────
const importData = async () => {
    try {
        // Clear existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Banner.deleteMany();

        // Hash passwords and insert users
        const hashedUsers = await Promise.all(
            users.map(async (u) => ({
                ...u,
                password: await bcrypt.hash(u.password, 10),
            }))
        );
        const createdUsers = await User.insertMany(hashedUsers);
        const adminUser = createdUsers[0]._id;

        // Attach admin user to each product
        const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
        await Product.insertMany(sampleProducts);

        // Attach admin user to each banner
        const sampleBanners = banners.map((b) => ({ ...b, user: adminUser }));
        await Banner.insertMany(sampleBanners);

        console.log('✅ Data Imported Successfully!');
        console.log('──────────────────────────────');
        console.log('👤 Admin: admin@shopez.com / password123');
        console.log('👤 User:  user@shopez.com  / password123');
        console.log(`📦 ${products.length} products seeded`);
        console.log(`🖼️  ${banners.length} banners seeded`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Banner.deleteMany();

        console.log('🗑️  Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
