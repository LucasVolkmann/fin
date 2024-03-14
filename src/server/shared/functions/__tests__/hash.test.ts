import bcrypt from 'bcryptjs';
import { PasswordCrypto } from '../hash';

describe('Test [functions hash]', () => {

  const MOCK_PASSWORD = 'MOCK_PASSWORD';
  function isBcryptHash(str: string) {
    if (str.length !== 60) {
      return false;
    }
    try {
      bcrypt.compareSync('dummyValue', str);
      return true;
    } catch (error) {
      return false;
    }
  }

  it('[hashPassword] should generate a bcrypt valid hashed password', async () => {
    const hashedPassword = await PasswordCrypto.hashPassword(MOCK_PASSWORD);

    expect(hashedPassword).not.toEqual(MOCK_PASSWORD);
    expect(isBcryptHash(hashedPassword)).toBe(true);
  });
  it('[verifyPassword] should return false when the passwords are not equals', async () => {
    const hashedPassword = await PasswordCrypto.hashPassword(MOCK_PASSWORD);

    expect(hashedPassword).not.toEqual(MOCK_PASSWORD);
    expect(await PasswordCrypto.verifyPassword(MOCK_PASSWORD + 'difference', hashedPassword)).toBe(false);
  });
  it('[verifyPassword] should return true when the passwords are equals', async () => {
    const hashedPassword = await PasswordCrypto.hashPassword(MOCK_PASSWORD);

    expect(hashedPassword).not.toEqual(MOCK_PASSWORD);
    expect(await PasswordCrypto.verifyPassword(MOCK_PASSWORD, hashedPassword)).toBe(true);
  });
});
