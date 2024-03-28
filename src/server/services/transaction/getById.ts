import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../models/Transaction';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';


export const getById = async (userId: number, transactionId: number): Promise<Transaction | void> => {

  const transaction =  await AppDataSource
    .getRepository(Transaction)
    .createQueryBuilder('transaction')
    .where(`transaction.userId = ${userId} AND transaction.id = ${transactionId}`)
    .getOne();

  if (!transaction) {
    throw new RegisterNotFoundError();
  }
  return transaction;

};
