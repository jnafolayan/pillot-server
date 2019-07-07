import uuidv1 from 'uuid/v1';

import Question from '../models/Question';
import { createError } from '../util';

export default class QuestionService {
  static createQuestion({ text, options, answer }) {
    const refId = uuidv1().split('-').shift();
    
    return Question.create({ text, options, answer, refId })
      .then(doc => refId);
  }

  static createMany(questions) {
    questions = questions.map(({ text, options, answer }) => {
      const refId = uuidv1().split('-').shift();
      return {
        refId,
        text,
        options,
        answer
      };
    });

    return Question.create(questions);
  }

  static deleteQuestion({ refId }) {
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

  static verifyAnswer({ questionId, answer }) {
    return Question.findOne({ refId: questionId })
      .then(verify);

    function verify(questionDoc) {
      return questionDoc.answer == answer;
    }
  }
}