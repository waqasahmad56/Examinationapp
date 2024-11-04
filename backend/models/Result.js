
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  testStartTime: {
    type: Date,
    required: true,
  },
  testEndTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 

  }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;

