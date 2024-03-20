import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { OutputUserDTOType } from '../../types/dtos/user/OutputUserDTOType.dto';



export const getByEmail = async (email: string): Promise<OutputUserDTOType | null> => {

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email
  });
  return user;

};
