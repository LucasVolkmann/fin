import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Transaction } from '../../models/Transaction';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';


export const deleteById = async (userId: number, transactionId: number): Promise<void | DeleteResult> => {

  const updateResult = await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(Transaction)
    .where('userId = :userId AND id = :transactionId', { userId, transactionId })
    .execute();

  if (!updateResult.affected || updateResult.affected <= 0) {
    throw new InternalServerError('Error while deleting transaction.');
  }
  return updateResult;
};