import { InvalidCredentialsError } from '../../shared/exceptions/InvalidCredentialsError';
import { PasswordCrypto } from '../../shared/functions/hash';
import { OutputUserDTOType } from '../../types/dtos/user/OutputUserDTOType.dto';
import { getByEmail } from './getByEmail';

export const auth = async (email: string, password: string): Promise<OutputUserDTOType | void> => {
  const searchedUser = await getByEmail(email);
  if (!searchedUser) {
    throw new InvalidCredentialsError();
  }
  if (await PasswordCrypto.verifyPassword(password, searchedUser.password)) {
    return searchedUser;
  } else {
    throw new InvalidCredentialsError();
  }
};
