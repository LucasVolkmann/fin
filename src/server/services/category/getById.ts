import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';


export const getById = async (userId: number, id: number) => {
  const category =  await AppDataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .where('category.id = :id AND category.userId = :userId', { id, userId })
    .getOne();

  if (!category) {
    throw new RegisterNotFoundError();
  }
  return category;
};