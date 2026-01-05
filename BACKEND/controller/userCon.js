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
        
        console.log('🔐 Login attempt:', email);

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            console.log('✅ Login successful:', email);
            res.json({ success: true, token })
        } else {
            console.log('❌ Invalid password');
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log('❌ Login error:', error);
        res.json({ success: false, message: error.message })
    }
}

// Step 2: Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('📝 Register attempt:', email);

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // Validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password (min 8 characters)" })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)

        console.log('✅ User registered:', email);
        res.json({ success: true, token })

    } catch (error) {
        console.log('❌ Register error:', error);
        res.json({ success: false, message: error.message })
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