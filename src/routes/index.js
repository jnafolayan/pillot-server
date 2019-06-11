import { Router } from 'express';

import userRouter from './userRouter';
import quizRouter from './quizRouter';
import sessionRouter from './sessionRouter';

export default function routes(app) {
  const router = Router();
  
  app.use('/users', userRouter);
  app.use('/quiz', quizRouter);
  app.use('/sessions', sessionRouter);

  return router;
}