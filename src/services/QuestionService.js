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
}