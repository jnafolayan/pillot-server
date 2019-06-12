import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth } from '../util';

const quizRouter = new Router();

quizRouter.post('/', verifyAuth, QuizController.createQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', QuizController.getQuiz);
quizRouter.delete('/:quizId', verifyAuth, QuizController.deleteQuiz);

export default quizRouter;
