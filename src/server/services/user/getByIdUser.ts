import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';


export const getByIdUser = async (id: number): Promise<User | void> => {

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      id
    });
    if (user) {
      return user;
    } else {
      throw new InternalServerError('Register not found.');
    }
  } catch (error) {
    if (error instanceof InternalServerError) {
      throw new InternalServerError(error.message);
    } else {
      throw new InternalServerError('Error while getting user by id.');
    }
  }

};