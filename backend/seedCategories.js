import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();
connectDB();

const electronics = [
  { name: 'Sony Alpha a7 IV Mirrorless Camera', brand: 'Sony', price: 2499, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80' },
  { name: 'Bose QuietComfort 45 Headphones', brand: 'Bose', price: 329, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80' },
  { name: 'Dell XPS 13 Laptop', brand: 'Dell', price: 1199, img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
  { name: 'Samsung 65" 4K Smart TV', brand: 'Samsung', price: 899, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80' },
  { name: 'Apple iPad Pro 11"', brand: 'Apple', price: 799, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80' },
  { name: 'Logitech MX Master 3 Mouse', brand: 'Logitech', price: 99, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80' },
  { name: 'Keychron K2 Mechanical Keyboard', brand: 'Keychron', price: 89, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80' },
  { name: 'Anker PowerCore 20000mAh', brand: 'Anker', price: 49, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80' },
  { name: 'Sony PlayStation 5 Console', brand: 'Sony', price: 499, img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80' },
  { name: 'Nintendo Switch OLED', brand: 'Nintendo', price: 349, img: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=600&q=80' }
];

const fashion = [
  { name: 'Levi\'s Classic 501 Original Jeans', brand: 'Levi\'s', price: 69, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80' },
  { name: 'Nike Air Max 270 Sneakers', brand: 'Nike', price: 150, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { name: 'Adidas Ultraboost 22', brand: 'Adidas', price: 180, img: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80' },
  { name: 'Ray-Ban Aviator Classic Sunglasses', brand: 'Ray-Ban', price: 160, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80' },
  { name: 'North Face Resolve 2 Jacket', brand: 'North Face', price: 90, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80' },
  { name: 'Calvin Klein Slim Fit Dress Shirt', brand: 'Calvin Klein', price: 45, img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600&q=80' },
  { name: 'Timberland Premium 6-Inch Boots', brand: 'Timberland', price: 198, img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80' },
  { name: 'Tommy Hilfiger Polo Shirt', brand: 'Tommy Hilfiger', price: 55, img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80' },
  { name: 'Fossil Minimalist Leather Watch', brand: 'Fossil', price: 120, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80' },
  { name: 'Vans Old Skool Classic Skate Shoes', brand: 'Vans', price: 70, img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80' }
];

const mobiles = [
  { name: 'Apple iPhone 15 Pro', brand: 'Apple', price: 999, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80' },
  { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 1199, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80' },
  { name: 'Google Pixel 8 Pro', brand: 'Google', price: 899, img: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=600&q=80' },
  { name: 'OnePlus 12 5G', brand: 'OnePlus', price: 799, img: 'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=600&q=80' },
  { name: 'Motorola Edge 40 Neo', brand: 'Motorola', price: 399, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbfd?w=600&q=80' },
  { name: 'Xiaomi 14 Pro', brand: 'Xiaomi', price: 850, img: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=600&q=80' },
  { name: 'Nothing Phone (2)', brand: 'Nothing', price: 599, img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80' },
  { name: 'Asus ROG Phone 8', brand: 'Asus', price: 1099, img: 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=600&q=80' },
  { name: 'Vivo X100 Pro', brand: 'Vivo', price: 950, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80' },
  { name: 'Realme GT 5', brand: 'Realme', price: 499, img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80' }
];

const home = [
  { name: 'Dyson V15 Detect Vacuum', brand: 'Dyson', price: 699, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80' },
  { name: 'Instant Pot Duo 7-in-1', brand: 'Instant Pot', price: 99, img: 'https://images.unsplash.com/photo-1585238341267-1cb5a527c9d1?w=600&q=80' },
  { name: 'Philips Hue White LED Bulb Starter Kit', brand: 'Philips', price: 79, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&q=80' },
  { name: 'Nespresso Vertuo Coffee Maker', brand: 'Nespresso', price: 159, img: 'https://images.unsplash.com/photo-1495474472207-464a8d4ce6a1?w=600&q=80' },
  { name: 'iRobot Roomba 694 Robot Vacuum', brand: 'iRobot', price: 274, img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80' },
  { name: 'KitchenAid Artisan Stand Mixer', brand: 'KitchenAid', price: 399, img: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&q=80' },
  { name: 'Ninja Air Fryer Max XL', brand: 'Ninja', price: 149, img: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=600&q=80' },
  { name: 'Herman Miller Aeron Chair', brand: 'Herman Miller', price: 1200, img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&q=80' },
  { name: 'Vitamix 5200 Blender', brand: 'Vitamix', price: 479, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80' },
  { name: 'YETI Tundra 45 Cooler', brand: 'YETI', price: 325, img: 'https://images.unsplash.com/photo-1520113412128-d890066b1e6e?w=600&q=80' }
];

const sports = [
  { name: 'Wilson Evolution Indoor Basketball', brand: 'Wilson', price: 79, img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=80' },
  { name: 'Babolat Pure Drive Tennis Racket', brand: 'Babolat', price: 229, img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80' },
  { name: 'Fitbit Charge 6 Fitness Tracker', brand: 'Fitbit', price: 159, img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80' },
  { name: 'Manduka PRO Yoga Mat', brand: 'Manduka', price: 129, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80' },
  { name: 'Bowflex SelectTech 552 Adjustable Dumbbells', brand: 'Bowflex', price: 429, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80' },
  { name: 'Nike Strike Soccer Ball', brand: 'Nike', price: 30, img: 'https://images.unsplash.com/photo-1614632537190-23e4146777f9?w=600&q=80' },
  { name: 'Garmin Forerunner 265', brand: 'Garmin', price: 449, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80' },
  { name: 'Callaway Golf Chrome Soft Balls', brand: 'Callaway', price: 49, img: 'https://images.unsplash.com/photo-1535136125439-d3493e839213?w=600&q=80' },
  { name: 'Speedo Vanquisher 2.0 Swim Goggles', brand: 'Speedo', price: 21, img: 'https://images.unsplash.com/photo-1560945958-8686a6358c30?w=600&q=80' },
  { name: 'Everlast Pro Style Training Gloves', brand: 'Everlast', price: 34, img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80' }
];

const generateProducts = (categoryData, categoryName, adminId) => {
  return categoryData.map((item, index) => ({
    name: item.name,
    image: item.img,
    brand: item.brand,
    category: categoryName,
    description: `Experience the amazing ${item.name} from ${item.brand}. High quality, premium design, and incredible performance make this the perfect choice for you. Top rated in the ${categoryName} category.`,
    price: item.price * 80, // Convert to INR approximate
    discountPrice: Math.floor(item.price * 80 * 0.9), // 10% discount
    countInStock: Math.floor(Math.random() * 50) + 5,
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    numReviews: Math.floor(Math.random() * 200) + 10,
    tags: [categoryName.toLowerCase(), item.brand.toLowerCase(), 'premium'],
    salesCount: Math.floor(Math.random() * 500),
    viewsCount: Math.floor(Math.random() * 2000),
    user: adminId
  }));
};

const importData = async () => {
  try {
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      console.error('No admin user found. Please run regular seeder first.');
      process.exit(1);
    }
    
    const adminId = adminUser._id;

    // Remove existing products
    await Product.deleteMany();
    console.log('Cleared existing products.');

    const allProducts = [
      ...generateProducts(electronics, 'Electronics', adminId),
      ...generateProducts(fashion, 'Fashion', adminId),
      ...generateProducts(mobiles, 'Mobiles', adminId),
      ...generateProducts(home, 'Home', adminId),
      ...generateProducts(sports, 'Sports', adminId),
    ];

    await Product.insertMany(allProducts);
    console.log(`✅ Successfully seeded ${allProducts.length} products across 5 categories!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
