// BACKEND/routes/auth.js
import express from 'express';
import { register, login, getProfile } from '../controller/auth.js';
import auth from '../middleware/auth.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);

// Protected route - requires authentication
authRouter.get('/profile', auth, getProfile);

export default authRouter;
