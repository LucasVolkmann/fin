import { AppDataSource } from '../../config/data-source';
import { User } from '../../models/User';
import { EmailAlreadyExistsError } from '../../shared/exceptions/EmailAlreadyExistsError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { PasswordCrypto } from '../../shared/functions/hash';
import { InputUserDTOType } from '../../types/dtos/user/InputUserDTOType.dto';
import { getByEmail } from './getByEmail';

export const create = async (userDTO: InputUserDTOType): Promise<number | void> => {

  const findEmail = await getByEmail(userDTO.email);
  if (findEmail) {
    throw new EmailAlreadyExistsError();
  }
  const hashedPassword = await PasswordCrypto.hashPassword(userDTO.password);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.save({
    username: userDTO.username,
    email: userDTO.email,
    password: hashedPassword,
  });
  if(!user?.id) {
    throw new InternalServerError('Error while creating user.');
  } else {
    return user.id;
  }

};
