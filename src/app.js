require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/productRoutes', productRoutes);
app.use('/api/orderRoutes', productRoutes);
app.use('/api/userRoutes', productRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    userNewUrlParser: true,
    userUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// sample route
app.get('/', (req, res) => {
    res.send('Welcome To Amez Online Store!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
