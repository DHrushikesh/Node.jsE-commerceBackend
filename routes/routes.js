import { getProducts, getProductById } from '../controllers/productController.js';
import { addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';
import { register, login } from '../controllers/authentication.js';
import { authenticate } from '../middleware/authentication.js';

function routes(app) {
    // Product routes
    app.get('/products', getProducts);
    app.get('/products/:id', getProductById);

    // Cart routes (protected)
    app.post('/cart', authenticate, addToCart);
    app.put('/cart/:id', authenticate, updateCart);
    app.delete('/cart/:id', authenticate, removeFromCart);

    // Authentication routes
    app.post('/auth/register', register);
    app.post('/auth/login', login);
}

export default routes;
// 677240e2985781b48fffabcc