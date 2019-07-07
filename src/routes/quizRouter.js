import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth, appendUser } from '../util';

const quizRouter = new Router();

quizRouter.post('/', verifyAuth, QuizController.createQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', appendUser, QuizController.getQuiz);
quizRouter.delete('/:quizId', verifyAuth, QuizController.deleteQuiz);

quizRouter.get('/:quizId/session', verifyAuth, QuizController.getQuizSession);

export default quizRouter;
