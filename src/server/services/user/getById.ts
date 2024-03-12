import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';
import { OutputUserDTOType } from '../../types/dtos/OutputUserDTOType.dto';


export const getById = async (id: number): Promise<OutputUserDTOType | void> => {

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      id
    });
    if (user) {
      return user;
    } else {
      throw new RegisterNotFoundError('Register not found.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new InternalServerError('Error while getting user by id.');
    }
  }

};