import jwt from "jsonwebtoken";
import User from "../models/users.js";

const auth = async (req, res, next) => {
  try {
    // Accept authorization from common locations: Authorization header, x-auth-token header
    const headerAuth = req.headers['authorization'] || req.header && req.header('Authorization');
    const xAuth = req.headers['x-auth-token'] || (req.header && req.header('x-auth-token'));
    const raw = headerAuth || xAuth || req.headers['token'] || null;

    if (!raw) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    // Support 'Bearer <token>' or raw token
    const token = String(raw).replace(/^\s*bearer\s+/i, '').trim();
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token is not valid' });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Token payload invalid' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token: user not found' });
    }

    // Expose only minimal user data on req.user to avoid accidental mutation of mongoose documents
    req.user = { id: String(user._id), role: user.role };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, message: 'Server error in auth' });
  }
};

export default auth;
