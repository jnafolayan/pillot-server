import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  refId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

export default mongoose.model('Quiz', QuizSchema);
