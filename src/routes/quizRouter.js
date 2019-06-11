import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth } from '../util';

const quizRouter = new Router();

quizRouter.post('/', QuizController.createQuiz);
quizRouter.delete('/', QuizController.deleteQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', QuizController.getQuiz);

export default quizRouter;
