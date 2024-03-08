import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';


export const deleteUser = async (userId: number): Promise<UpdateResult | void> => {

  const userRepository = AppDataSource.getRepository(User);

  const updateResult = await userRepository.softDelete({
    id: userId
  });
  return updateResult;

};
