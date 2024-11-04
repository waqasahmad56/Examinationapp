import Quiz from '../models/Quiz.js';
import QuizRecord from '../models/Result.js';

export const saveAnswer = async (req, res) => {
  try {
    const { quizId, userId, questionId, answer } = req.body;

    if (!quizId || !userId || !questionId || answer === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingRecord = await QuizRecord.findOne({ quizId, userId });

    if (existingRecord) {
      
      existingRecord.userAnswers[questionId] = answer;
      await existingRecord.save();
    } else {
      const quizRecord = new QuizRecord({
        quizId,
        userId,
        userAnswers: { [questionId]: answer },
      });
      await quizRecord.save();
    }

    res.status(200).json({ message: 'Answer saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


























export const saveQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // Check if title and questions are provided
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Title and questions are required' });
    }

    // Validate questions structure
    for (const question of questions) {
      if (!question.category || !question.questionText || !Array.isArray(question.options) || question.options.length === 0) {
        return res.status(400).json({ error: 'Invalid question structure' });
      }

      // Validate options structure
      for (const option of question.options) {
        if (!option.optionText || option.isCorrect === undefined) {
          return res.status(400).json({ error: 'Invalid option structure' });
        }
      }
    }

    // Create a new Quiz document
    const quiz = new Quiz({
      title,
      questions,
    });

    // Save the Quiz document to the database
    await quiz.save();

    // Return the saved quiz
    res.status(201).json(quiz);
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};
