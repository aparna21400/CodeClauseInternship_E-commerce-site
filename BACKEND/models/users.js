import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6 },
  address: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }

}, { timestamps: true });

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel