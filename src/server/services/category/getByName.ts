import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';

export const getByName = async (userId: number, name: string): Promise<Category | null> => {

  return await AppDataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .where('category.userId = :userId AND category.name = :name', { userId, name })
    .getOne();

};