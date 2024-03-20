import { create, createValidator } from './create';
import { update, updateValidator } from './update';
import { getAll, getAllValidator } from './getAll';
import { getById, getByIdValidator } from './getById';
import { deleteById } from './deleteById';

export const CategoryController = {
  create,
  createValidator,
  deleteById,
  getAll,
  getAllValidator,
  getById,
  getByIdValidator,
  update,
  updateValidator,
};