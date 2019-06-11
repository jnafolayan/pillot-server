import uuidv1 from 'uuid/v1';

import Question from '../models/Question';
import { createError } from '../util';

export default class QuestionService {
  static createQuestion({ text, options }) {
    const refId = uuidv1().split('-').shift();
    
    return Question.create({ text, options, refId })
      .then(doc => refId);
  }

  static deleteQuestion(refId) {
    return Question.deleteOne({ refId });
  }

  static getQuestion({ questionId }) {
    return Question.findOne({ questionId })
      .exec()
      .then(extractQuestion);

    function extractQuestion({ questions }) {
      const question = questions[questionId];
      return {
        refId: question.refId,
        text: question.text,
        options: question.options
      };
    }
  }

  static verifyAnswer({ quizId, questionId, answer }) {
    return QuizService.getQuestion({ quizId, questionId })
      .then(get)
  }
}