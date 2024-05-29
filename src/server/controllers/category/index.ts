import { create, createValidator } from './create';
import { deleteById, deleteByIdValidator } from './deleteById';
import { getAll, getAllValidator } from './getAll';
import { getById, getByIdValidator } from './getById';
import { getCategoryNumbers } from './getCategoryNumbers';
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
  getCategoryNumbers,
  update,
  updateValidator,
};