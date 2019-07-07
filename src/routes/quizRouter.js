import { Router } from 'express';
import { check } from 'express-validator';
import QuizController from '../controllers/QuizController';
import { verifyAuth, checkRequestErrors, appendUser } from '../util';

const quizRouter = new Router();

const quizCreationCheck = [
  check('title').isString(), 
  check('description').isString(), 
  check('questions').isArray(), 
  check('backdrop').isString()
];

quizRouter.post('/', quizCreationCheck, checkRequestErrors, verifyAuth, QuizController.createQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', appendUser, QuizController.getQuiz);
quizRouter.delete('/:quizId', verifyAuth, QuizController.deleteQuiz);

quizRouter.get('/:quizId/session', verifyAuth, QuizController.getQuizSession);

export default quizRouter;
