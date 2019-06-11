import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { verifyAuth } from '../util';

const quizRouter = new Router();

quizRouter.post('/', QuizController.createQuiz);
quizRouter.delete('/', QuizController.deteleQuiz);
quizRouter.get('/', QuizController.getAllQuizzes);

quizRouter.get('/:quizId', QuizController.getQuiz);

quizRouter.get('/questions/:questionId', QuizController.getQuestion);
quizRouter.post('/:quizId/questions/:questionId', QuizController.verifyAnswer);

export default quizRouter;
