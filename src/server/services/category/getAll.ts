import { AppDataSource } from '../../config/data-source';
import { Category } from '../../models/Category';

export const getAll = async (userId: number, filter = '') => {

  return await AppDataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .where(`category.userId = ${userId} AND name LIKE '%${filter}%'`)
    .getMany();

};
