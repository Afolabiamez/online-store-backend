require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const sneakers = require('./sneakers');

mongoose.connect(process.env.MONGO_URI);


const seedProducts = async () => {
    try {
        await Product.deleteMany({});
        for (let i = 0; i < 20; i++) {
            const rand50 = Math.floor(Math.random() * sneakers.length - 1);
            const sneakSeeds = new Product({
                name: sneakers[rand50].name,
                description: sneakers[rand50].description,
                price: sneakers[rand50].price,
                stock: sneakers[rand50].stock,
                category: sneakers[rand50].category,
                image: sneakers[rand50].image,
            })
            await sneakSeeds.save();
        }
        // const products = [
        //     { name: 'Sneaker 1', price: 100, description: 'Cool sneaker' },
        //     { name: 'Sneaker 2', price: 150, description: 'Trendy sneaker' }
        // ];
        // await Product.insertMany(products);
        console.log('Database seeded!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedProducts();
