import express from 'express';
import dotenv from 'dotenv';
import {fetchAllMembers} from '../controllers/membershipController.js';

import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { registerMember } from '../controllers/membershipController.js';
dotenv.config();    

const router = express.Router();


// Get all members
router.get('/', authenticateToken, authorizeRoles('admin'),fetchAllMembers);

export default router;

router.post('/add', registerMember)
