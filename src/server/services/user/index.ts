import { auth } from './auth';
import { create } from './create';
import { deleteById } from './deleteById';
import { getByEmail } from './getByEmail';
import { getById } from './getById';
import { updateUsername } from './updateUsername';

export const UserService = {
  auth,
  create,
  deleteById,
  getByEmail,
  getById,
  updateUsername,
};