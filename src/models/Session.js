import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  quiz: { type: String, required: true },
  status: { type: String, default: 'started' },
  questions: [{
    questionId: String,
    correct: Boolean
  }],
  cursor: { type: Number, default: 0 }
});

SessionSchema.statics.PENDING = 'pending';
SessionSchema.statics.STARTED = 'started';
SessionSchema.statics.ENDED = 'ended';

export default mongoose.model('Session', SessionSchema);
