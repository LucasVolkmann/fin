import express from 'express';
import { UserController } from '../controllers/user';
import { ensureAuth } from '../shared/middlewares/ensureAuth';

const userRouter = express.Router();

userRouter.post('/auth', UserController.authValidator, UserController.auth);

userRouter.get('/user', ensureAuth, UserController.getUserByToken);

userRouter.delete('/user',
  ensureAuth,
  UserController.deleteValidation,
  UserController.deleteById
);

userRouter.put('/user',
  ensureAuth,
  UserController.updateUsernameValidator,
  UserController.updateUsername
);

userRouter.post('/user', UserController.createValidator, UserController.create);

export default userRouter;

