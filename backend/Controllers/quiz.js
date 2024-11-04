import Quiz from '../models/Quiz.js';
import Result from '../models/Result.js';


export const getQuiz = async (req, res) => {
  console.log("token in quiz",req.token)
    try {
      const title = 'Advanced Data Analysis Quiz'; 
      const quiz = await Quiz.find({title:title});
      console.log("quiz",quiz)
      res.json(quiz);
    } catch (err) { 
      res.status(500).json({ message: err.message });
    }
}

export const getQuizRecord = async (req, res) => {
    try {
        const quizRecord = await QuizRecord.find().sort({ createdAt: -1 });
        res.json(quizRecord);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const saveQuizRecord=async (req, res) => {
  const { totalQuestions, correctAnswers, totalTime, testStartTime, testEndTime } = req.body;
  const userId = req.token.id;

  try {
    const result = new Result({
      totalQuestions,
      correctAnswers,
      totalTime,
      testStartTime,
      testEndTime,
      user: userId,
    });
    await result.save();
    res.status(201).json({ message: 'Results saved successfully', result });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ message: 'Error saving results', error });
  }
}; 

