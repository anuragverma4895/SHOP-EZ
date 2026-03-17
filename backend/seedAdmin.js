import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const seedAdmin = async () => {
    try {
        await User.deleteMany({ email: 'admin@shopez.com' });

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@shopez.com',
            password: 'password123',
            isAdmin: true,
            phone: '1234567890',
            address: 'ShopEZ Headquarters'
        });

        console.log('Admin User Created Successfully!');
        console.log('---------------------------------');
        console.log(`Email:    ${adminUser.email}`);
        console.log(`Password: password123`);
        console.log('---------------------------------');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
