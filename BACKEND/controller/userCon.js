import validator from "validator";
import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Step 1: Login User
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

        // Check if user exists and include password for comparison
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" })

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            return res.status(400).json({ success: false, message: "Invalid email or password" })
        }

    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

// Step 2: Register User
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required' });

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "User already exists" })

        // Validation
        if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Please enter valid email" })
        if (password.length < 8) return res.status(400).json({ success: false, message: "Please enter strong password (min 8 characters)" })

        // Create new user (let model pre-save hash the password)
        const newUser = new userModel({ name, email, password })
        
        const user = await newUser.save()
        const token = createToken(user._id)

        res.status(201).json({ success: true, token })

    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

// Step 3: Admin Login
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

export { loginUser, registerUser, adminLogin }