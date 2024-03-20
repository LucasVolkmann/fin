import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { CategoryService } from '.';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';


export const deleteById = async (userId: number, categoryId: number): Promise<DeleteResult | void> => {

  const categoryExists = await CategoryService.getById(userId, categoryId);

  if (!categoryExists) {
    throw new RegisterNotFoundError();
  }

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