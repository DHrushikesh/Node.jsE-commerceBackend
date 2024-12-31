import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secret = 'E-commerce secret key';

// Register a new user
export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Authenticate user and return a JWT token
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};