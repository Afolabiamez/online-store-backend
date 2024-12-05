require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const Product = require('./models/Product')
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/productRoutes', productRoutes);
app.use('/orderRoutes', productRoutes);
app.use('/userRoutes', productRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// sample route
// app.get('/productRoutes/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

app.get('*', (req, res) => {
    res.send('i dont know this path!!')
})
