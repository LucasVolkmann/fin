import { createController, createValidator } from './createController';
import { getByIdController, getByIdValidator } from './getByIdController';
import { authController, authValidator } from './authController';

export const UserController = {
  createController,
  createValidator,
  getByIdController,
  getByIdValidator,
  authValidator,
  authController,
};