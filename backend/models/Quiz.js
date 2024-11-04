import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      category: {
        type: String,
        enum: ['Generic', 'Data-Analysis', 'Inductive Reasoning'],
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      questionImageURL: {
        type: String,
      },
      options: [
        {
          optionText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
