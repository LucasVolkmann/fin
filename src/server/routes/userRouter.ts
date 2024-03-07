import express from 'express';
import { UserController } from '../controllers/user';
import { ensureAuth } from '../shared/middlewares/ensureAuth';

const userRouter = express.Router();

userRouter.post('/auth', UserController.authValidator, UserController.authController);

userRouter.get('/user', ensureAuth, UserController.getUserByTokenController);

userRouter.post('/user', UserController.createValidator, UserController.createController);

export default userRouter;

