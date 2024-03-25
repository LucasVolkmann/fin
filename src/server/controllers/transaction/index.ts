import { create, createValidator } from './create';
import { update } from './update';
import { getAll } from './getAll';
import { deleteById } from './deleteById';
import { getById } from './getById';


export const TransactionController = {
  createValidator,
  create,
  deleteById,
  getAll,
  getById,
  update,
};