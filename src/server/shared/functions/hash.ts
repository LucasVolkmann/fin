import { compare, genSalt, hash } from 'bcryptjs';

const SALT_ROUNDS = 4;

const hashPassword = async (password: string) => {
  const salt = await genSalt(SALT_ROUNDS);

  return await hash(password, salt);
};

const verifyPassword = async (password: string, hashedPassword:string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword
};