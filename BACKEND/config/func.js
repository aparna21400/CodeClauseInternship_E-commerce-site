const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./keys.js");

// Generate JWT Token
exports.generateToken = (userId, email) => {
    return jwt.sign(
        { id: userId, email }, 
        JWT_SECRET, 
        { expiresIn: '7d' }
    );
};

// Verify JWT Token
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

// Validate Email
exports.validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Validate Password (min 6 chars)
exports.validatePassword = (password) => {
    return password && password.length >= 6;
};