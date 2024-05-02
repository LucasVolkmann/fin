import { create, createValidator } from './create';
import { deleteById, deleteByIdValidator } from './deleteById';
import { getAll, getAllValidator } from './getAll';
import { getById, getByIdValidator } from './getById';
import { getMonthlyHistory } from './getMonthlyHistory';
import { update, updateValidator } from './update';


export const TransactionController = {
  create,
  createValidator,
  deleteById,
  deleteByIdValidator,
  getAll,
  getAllValidator,
  getById,
  getByIdValidator,
  getMonthlyHistory,
  update,
  updateValidator,
};