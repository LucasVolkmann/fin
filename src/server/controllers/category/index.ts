import { create, createValidator } from './create';
import { deleteById, deleteByIdValidator } from './deleteById';
import { getAll, getAllValidator } from './getAll';
import { getById, getByIdValidator } from './getById';
import { update, updateValidator } from './update';

export const CategoryController = {
  create,
  createValidator,
  deleteById,
  deleteByIdValidator,
  getAll,
  getAllValidator,
  getById,
  getByIdValidator,
  update,
  updateValidator,
};