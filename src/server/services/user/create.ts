import { User } from '../../models/User';
import { InputUserDTOType } from '../../models/dtos/InputUserDTOType';
import { EmailAlreadyExistsError } from '../../shared/exceptions/EmailAlreadyExistsError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { PasswordCrypto } from '../../shared/functions/hash';
import { getByEmail } from './getByEmail';

export const create = async (userDTO: InputUserDTOType): Promise<number | void> => {

  const findEmail = await getByEmail(userDTO.email);
  if (findEmail) {
    throw new EmailAlreadyExistsError('This e-mail already exists.');
  }

  const hashedPassword = await PasswordCrypto.hashPassword(userDTO.password);

  const user = new User(userDTO.username, userDTO.email, hashedPassword);

  const newUser = await user.save();
  if(!newUser.id) {
    throw new InternalServerError('Error while creating user.');
  } else {
    return newUser.id;
  }

};
