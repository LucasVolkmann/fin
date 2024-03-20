import { UpdateResult } from 'typeorm';
import { Category } from '../../models/Category';
import { AppDataSource } from '../../config/data-source';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { CategoryService } from '.';
import { CategoryNameAlreadyInUseError } from '../../shared/exceptions/CategoryNameAlreadyInUseError';


export const update = async (userId: number, category: {id: number, name: string}): Promise<UpdateResult | void> => {

  const nameExistence = await CategoryService.getByName(userId, category.name);
  if (nameExistence) {
    throw new CategoryNameAlreadyInUseError();
  }

  const updateResult = await AppDataSource
    .createQueryBuilder()
    .update(Category)
    .set({ name: category.name})
    .where('id = :id AND userId = :userId', { id: category.id, userId })
    .execute();

  if (!updateResult.affected || updateResult?.affected <= 0) {
    throw new InternalServerError('Error while updating category.');
  }
  return updateResult;
};