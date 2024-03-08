import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { OutputUserDTOType } from '../../models/dtos/OutputUserDTOType';



export const usernameUpdateUser = async (user: OutputUserDTOType): Promise<UpdateResult | void> => {

  const userRepository = await AppDataSource.getRepository(User);
  const updateResult = await userRepository.update({
    id: user.id,
  }, user);
  if (!updateResult) {
    throw new InternalServerError('Error while updating register.');
  }
  return updateResult;

};
