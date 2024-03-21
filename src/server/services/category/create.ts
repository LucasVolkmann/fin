import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';
import { CategoryNameAlreadyInUseError } from '../../shared/exceptions/CategoryNameAlreadyInUseError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { UserService } from '../user';
import { getByName } from './getByName';

export const create = async (name: string, userId: number): Promise<number | void> => {

  await UserService.getById(userId);
  const recoveryCategory = await getByName(userId, name);
  if (recoveryCategory) {
    throw new CategoryNameAlreadyInUseError();
  }

  const newCategory = await AppDataSource
    .getRepository(Category)
    .save({
      name,
      user: {
        id: userId
      }
    });

  if (!newCategory.id) {
    throw new InternalServerError('Error while creating a category.');
  }
  return newCategory.id;

};
