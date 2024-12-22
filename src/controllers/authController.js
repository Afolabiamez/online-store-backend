const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path to your User model

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const signUpUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, email: newUser.email } });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

module.exports = { loginUser, signUpUser };
