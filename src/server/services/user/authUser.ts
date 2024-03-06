import { User } from '../../models/User';
import { InvalidCredentialsError } from '../../shared/exceptions/InvalidCredentialsError';
import { PasswordCrypto } from '../../shared/functions/hash';
import { getByEmailUser } from './getByEmailUser';


export const authUser = async (email: string, password: string): Promise<User | void> => {

  const searchedUser = await getByEmailUser(email);

  if (!searchedUser) {
    throw new InvalidCredentialsError();
  }
  if (await PasswordCrypto.verifyPassword(password, searchedUser.password)) {
    return searchedUser;
  } else {
    throw new InvalidCredentialsError();
  }

};
