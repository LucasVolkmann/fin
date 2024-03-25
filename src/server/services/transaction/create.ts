import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../models/Transaction';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';


export const create = async (transaction: Transaction): Promise<number | void> => {

  const newTransaction = await AppDataSource
    .getRepository(Transaction)
    .save(transaction);

  if (!newTransaction) {
    throw new InternalServerError('Error while creating a transaction.');
  }
  return transaction.id;

};
