import uuidv1 from 'uuid/v1';

import Quiz from '../models/Quiz';
import QuestionService from '../services/QuestionService';
import { createError } from '../util';

export default class QuizService {
  static createQuiz({ title, description, questions, backdrop, user }) {
    const creator = user.id;
    const refId = uuidv1().split('-').shift();

    return QuestionService.createMany(questions)
      .then(createQuiz)
      .then(doc => refId);

    function createQuiz(docs) {
      const qIds = docs.map(doc => doc._id);

      return Quiz.create({
        refId, 
        title, 
        description, 
        creator,
        backdrop,
        questions: qIds
      });
    }
  }

  static deleteQuiz({ refId, user }) {
    const creator = user.id;
    return Quiz.deleteOne({ creator, refId });
  }
}