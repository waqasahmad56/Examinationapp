import express from 'express'
import { verifyToken } from '../middleware/auth.js';

import { updateUser,getUser } from '../Controllers/user.js';

const router = express.Router();

router.patch('/update',verifyToken,updateUser);
router.get('/get',verifyToken,getUser);

export default router;
