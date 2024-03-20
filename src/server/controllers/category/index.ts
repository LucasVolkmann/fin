import { create, createValidator } from './create';
import { update, updateValidator } from './update';
import { getAll } from './getAll';
import { deleteById } from './deleteById';

export const CategoryController = {
  create,
  createValidator,
  deleteById,
  getAll,
  update,
  updateValidator,
};