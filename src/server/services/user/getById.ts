import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';
import { OutputUserDTOType } from '../../types/dtos/OutputUserDTOType.dto';


export const getById = async (id: number): Promise<OutputUserDTOType | void> => {

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id
  });

  if (user) {
    return user;
  } else {
    throw new RegisterNotFoundError();
  }

};