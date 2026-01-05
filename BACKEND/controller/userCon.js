import validator from "validator";
import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Step 1: Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        console.log('🔐 Login attempt:', email);

        // Check if user exists and include password for comparison
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            console.log('✅ Login successful:', email);
            res.json({ success: true, token })
        } else {
            console.log('❌ Invalid password');
            res.status(400).json({ success: false, message: "Invalid email or password" })
        }

    } catch (error) {
        console.log('❌ Login error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Step 2: Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('📝 Register attempt:', email);

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required' });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        // Validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter strong password (min 8 characters)" })
        }

        // Create new user (let model pre-save hash the password)
        const newUser = new userModel({
            name,
            email,
            password
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)

        console.log('✅ User registered:', email);
        res.status(201).json({ success: true, token })

    } catch (error) {
        console.log('❌ Register error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Step 3: Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin }