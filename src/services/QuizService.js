import uuidv1 from 'uuid/v1';

import Quiz from '../models/Quiz';
import { createError } from '../util';

export default class QuizService {
  static createQuiz({ title, description, questions }) {
    const refId = uuidv1().split('-').shift();
    
    return Quiz.create({ title, description, questions, refId })
      .then(doc => refId);
  }

  static deleteQuiz({ quidId }) {
    return Quiz.deleteOne({ refId: quidId });
  }
}