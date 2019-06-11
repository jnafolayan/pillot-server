import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth } from '../util';

const quizRouter = new Router();

quizRouter.post('/', QuizController.createQuiiz);
quizRouter.delete('/', QuizController.deteleQuiz);

export default quizRouter;