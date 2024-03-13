import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { OutputUserDTOType } from '../../types/dtos/OutputUserDTOType.dto';



export const updateUsername = async (user: OutputUserDTOType): Promise<UpdateResult | void> => {

  const userRepository = await AppDataSource.getRepository(User);
  const updateResult = await userRepository.update({
    id: user.id,
  }, user);
  if (!updateResult || !updateResult?.affected || updateResult.affected <= 0) {
    throw new InternalServerError('Error while updating register.');
  }
  return updateResult;

};
