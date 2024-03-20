import { create, createValidator } from './create';
import { update, updateValidator } from './update';
import { getAll } from './getAll';
import { deleteById } from './deleteById';
import { getByName } from './getByName';


export const CategoryController = {
  create,
  createValidator,
  deleteById,
  getAll,
  getByName,
  update,
  updateValidator,
};