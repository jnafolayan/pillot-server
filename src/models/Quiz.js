import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const QuizSchema = new mongoose.Schema({
  refId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: ObjectId, ref: 'Question' }],
  creator: { type: ObjectId, ref: 'User', required: true },
  backdrop: { type: String, required: true }
});

QuizSchema.index({
  title: 'text',
  description: 'text'
}, {
  weights: {
    name: 3,
    description: 1
  }
});

export default mongoose.model('Quiz', QuizSchema);
