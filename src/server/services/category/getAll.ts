import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';

export const getAll = async (userId: number) => {

  return await AppDataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .where('category.userId = :userId', { userId })
    .getMany();

};
