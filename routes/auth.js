import express from 'express';
import dotenv from 'dotenv';
import { loginUser } from '../controllers/authController.js';

dotenv.config();

const router = express.Router();

// User Login 
router.route('/login').post(loginUser);


export default router;