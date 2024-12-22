exports.getCart = (req, res) => {
    // Logic to fetch cart data from the database
    res.status(200).json({ message: 'Cart fetched successfully' });
};
