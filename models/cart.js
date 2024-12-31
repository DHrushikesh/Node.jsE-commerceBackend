import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;