import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { getById } from './getById';


export const deleteById = async (userId: number, categoryId: number): Promise<DeleteResult | void> => {

  await getById(userId, categoryId);

  const updateResult = await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(Category)
    .where('userId = :userId AND id = :categoryId', { userId, categoryId })
    .execute();

  if (!updateResult.affected || updateResult.affected <= 0) {
    throw new InternalServerError('Error while deleting category.');
  }
  return updateResult;
};