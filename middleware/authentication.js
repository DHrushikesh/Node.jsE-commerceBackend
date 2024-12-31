import jwt from 'jsonwebtoken';

const secret = 'E-commerce secret key';

export const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const token = authHeader.replace('Json ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};


