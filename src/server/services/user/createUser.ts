import { User } from '../../models/User';
import { UserDTOType } from '../../models/dtos/UserDTOType';
import { EmailAlreadyExistsError } from '../../shared/exceptions/EmailAlreadyExistsError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { getByEmailUser } from './getByEmailUser';

export const createUser = async (userDTO: UserDTOType): Promise<number | void> => {

  const findEmail = await getByEmailUser(userDTO.email);
  if (findEmail) {
    throw new EmailAlreadyExistsError('This e-mail already exists.');
  }

  const user = new User(userDTO.username, userDTO.email, userDTO.password);

  const newUser = await user.save();
  if(!newUser.id) {
    throw new InternalServerError('Error while creating user.');
  } else {
    return newUser.id;
  }

};
