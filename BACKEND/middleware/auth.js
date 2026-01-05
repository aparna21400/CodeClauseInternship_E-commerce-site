import jwt from "jsonwebtoken";
import User from "../models/users.js";

const auth = async (req, res, next) => {
  try {
    // Accept authorization header case-insensitively and support 'Bearer' prefix in any case
    const authHeader = req.headers['authorization'] || req.header('Authorization') || req.header('x-auth-token');

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    const token = String(authHeader).replace(/bearer\s+/i, '').trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in auth'
    });
  }
};

export default auth;
