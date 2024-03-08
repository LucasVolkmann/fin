import { createController, createValidator } from './createController';
import { getUserByTokenController } from './getUserByTokenController';
import { authController, authValidator } from './authController';
import { deleteController, deleteValidation } from './deleteController';

export const UserController = {
  createController,
  createValidator,
  getUserByTokenController,
  authValidator,
  authController,
  deleteController,
  deleteValidation,
};