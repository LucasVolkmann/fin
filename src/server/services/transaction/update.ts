import { UpdateResult } from 'typeorm';
import { Transaction } from '../../models/Transaction';
import { AppDataSource } from '../../config/data-source';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { CategoryService } from '../category';

export const update = async (userId: number, transaction: Transaction): Promise<void | UpdateResult> => {

  // FIXME: Refactor this method
  if (!transaction.categoryId) {
    throw new InternalServerError('Error while updating a register');
  }
  const category = await CategoryService.getById(userId, transaction.categoryId);

  delete transaction.categoryId;

  const updateResult =  await AppDataSource
    .createQueryBuilder()
    .update(Transaction)
    .set({
      ...transaction,
      category,
    })
    .where(`userId = ${userId} AND id = ${transaction.id}`)
    .execute();

  if (!updateResult.affected || updateResult.affected <= 0) {
    throw new InternalServerError('Error while updating transaction.');
  }
  return updateResult;
};