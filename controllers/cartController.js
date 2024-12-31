import Cart from '../models/Cart.js';

// Add a product to the shopping cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the quantity of a product in the cart
export const updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const cartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a product from the cart
export const removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await Cart.findByIdAndDelete(id);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};