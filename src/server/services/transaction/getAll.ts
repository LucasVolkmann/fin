import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../models/Transaction';


export const getAll = async (userId: number): Promise<Transaction[] | void> => {

  return await AppDataSource
    .getRepository(Transaction)
    .createQueryBuilder('transaction')
    .where(`transaction.userId = ${userId}`)
    .getMany();

};
