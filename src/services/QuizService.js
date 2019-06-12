import uuidv1 from 'uuid/v1';

import Quiz from '../models/Quiz';
import { createError } from '../util';

export default class QuizService {
  static createQuiz({ title, description, questions, user }) {
    const creator = user.id;
    const refId = uuidv1().split('-').shift();
    
    return Quiz.create({ title, description, questions, creator, refId })
      .then(doc => refId);
  }

  static deleteQuiz({ quizId }) {
    return Quiz.deleteOne({ refId: quizId });
  }
}