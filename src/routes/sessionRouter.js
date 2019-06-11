import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { verifyAuth } from '../util';

const sessionRouter = new Router();

sessionRouter.post('/', SessionController.createSession);
sessionRouter.post('/:sessionId', SessionController.startSession);
sessionRouter.delete('/:sessionId', SessionController.endSession);

sessionRouter.get('/:sessionId/questions/:questionId', SessionController.getQuestion);

export default sessionRouter;
