import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';


export const deleteById = async (userId: number): Promise<number | void> => {

  const userRepository = AppDataSource.getRepository(User);
  const updateResult = await userRepository.softDelete({
    id: userId
  });
  if (!updateResult || !updateResult.affected || updateResult.affected <= 0) {
    throw new InternalServerError('Error while deleting register.');
  } else {
    return updateResult.affected;
  }
};
