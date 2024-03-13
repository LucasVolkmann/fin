import express from 'express';
import { UserController } from '../controllers/user';
import { ensureAuth } from '../shared/middlewares/ensureAuth';

const userRouter = express.Router();

export enum UserRoutesEnum {
  AUTH = '/auth',
  USER = '/user'
}

userRouter.post(`${UserRoutesEnum.AUTH}`, UserController.authValidator, UserController.auth);

userRouter.get(`${UserRoutesEnum.USER}`, ensureAuth, UserController.getUserByToken);

userRouter.delete(`${UserRoutesEnum.USER}`,
  ensureAuth,
  UserController.deleteValidation,
  UserController.deleteById
);

userRouter.put(`${UserRoutesEnum.USER}`,
  ensureAuth,
  UserController.updateUsernameValidator,
  UserController.updateUsername
);

userRouter.post(`${UserRoutesEnum.USER}`, UserController.createValidator, UserController.create);

export default userRouter;

