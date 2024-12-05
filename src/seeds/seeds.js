require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect(process.env.MONGO_URI);

const seedProducts = async () => {
    try {
        await Product.deleteMany({});
        const products = [
            { name: 'Sneaker 1', price: 100, description: 'Cool sneaker' },
            { name: 'Sneaker 2', price: 150, description: 'Trendy sneaker' }
        ];
        await Product.insertMany(products);
        console.log('Database seeded!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedProducts();
