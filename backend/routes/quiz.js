import express from 'express'
import { verifyToken } from '../middleware/auth.js';

import {getQuiz,getQuizRecord,saveQuizRecord} from '../Controllers/quiz.js';

const router = express.Router();

router.get('/quiz', verifyToken, getQuiz);

router.get('/quizRecord',verifyToken, getQuizRecord);

router.post('/saveRecord',verifyToken, saveQuizRecord);

export default router;