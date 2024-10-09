import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  responses: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  date: { type: Date, default: Date.now }
});

const QuizResult = mongoose.model('QuizResult', QuizResultSchema);

export default QuizResult;
