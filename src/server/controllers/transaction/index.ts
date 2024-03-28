import { create, createValidator } from './create';
import { update } from './update';
import { getAll } from './getAll';
import { deleteById } from './deleteById';
import { getById, getByIdValidator } from './getById';


export const TransactionController = {
  createValidator,
  create,
  deleteById,
  getAll,
  getById,
  getByIdValidator,
  update,
};