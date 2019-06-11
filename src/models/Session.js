import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  questions: [{
    questionId: String,
    correct: Boolean
  }]
});

export default mongoose.model('Session', SessionSchema);
