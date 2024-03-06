import express from 'express';
import { UserController } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/auth', UserController.authValidator, UserController.authController);

userRouter.get('/user/:id', UserController.getByIdValidator, UserController.getByIdController);

userRouter.post('/user', UserController.createValidator, UserController.createController);

export default userRouter;

