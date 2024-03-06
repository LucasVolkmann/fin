import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';



export const getByEmailUser = async (email: string): Promise<User | null> => {

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email
  });
  return user;

};
