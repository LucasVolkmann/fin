import { create, createValidator } from './create';
import { getUserByToken } from './getUserByToken';
import { auth, authValidator } from './auth';
import { deleteById, deleteValidation } from './deleteById';
import { updateUsername, updateUsernameValidator } from './updateUsername';

export const UserController = {
  create,
  createValidator,
  getUserByToken,
  authValidator,
  auth,
  deleteById,
  deleteValidation,
  updateUsername,
  updateUsernameValidator,
};