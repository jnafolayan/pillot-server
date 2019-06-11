import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth } from '../util';

const quizRouter = new Router();

quizRouter.post('/', QuizController.createQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', QuizController.getQuiz);
quizRouter.delete('/:quizId', QuizController.deleteQuiz);

export default quizRouter;
