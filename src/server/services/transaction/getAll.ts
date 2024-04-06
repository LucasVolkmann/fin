import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../models/Transaction';


export const getAll = async (userId: number, month?: number): Promise<Transaction[] | void> => {

  if (month) {
    return await AppDataSource
      .getRepository(Transaction)
      .createQueryBuilder('transaction')
      .where(`transaction.userId = ${userId} AND EXTRACT(MONTH FROM date) = ${month};`)
      .getMany();
  }
  return await AppDataSource
    .getRepository(Transaction)
    .createQueryBuilder('transaction')
    .where(`transaction.userId = ${userId}`)
    .getMany();

};
