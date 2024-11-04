import express from 'express';
import { saveQuiz } from '../Controllers/quizController.js';
import { saveAnswer } from '../Controllers/quizController.js';
import { verifyToken } from '../middleware/auth.js';



const router = express.Router();

router.post('/quizzes', saveQuiz);
router.post('/saveAnswer', verifyToken, saveAnswer);


export default router;

