import { createController, createValidator } from './createController';
import { getUserByTokenController } from './getUserByTokenController';
import { authController, authValidator } from './authController';

export const UserController = {
  createController,
  createValidator,
  getUserByTokenController,
  authValidator,
  authController,
};