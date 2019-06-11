import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: false },
  text: { type: String, required: true },
  options: [{ 
    type: String, 
    required: true 
  }],
  answer: { type: String, required: true }
});

export default mongoose.model('Question', QuestionSchema);

