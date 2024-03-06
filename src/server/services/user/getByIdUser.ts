import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { RegisterNotFoundError } from '../../shared/exceptions/RegisterNotFoundError';


export const getByIdUser = async (id: number): Promise<User | void> => {

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