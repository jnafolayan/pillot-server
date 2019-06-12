import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const QuizSchema = new mongoose.Schema({
  refId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: ObjectId, ref: 'Question' }],
  creator: { type: ObjectId, ref: 'User' }
});

export default mongoose.model('Quiz', QuizSchema);
