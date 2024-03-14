import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { JwtSecretNotFoundError } from '../exceptions/JwtSecretNotFoundError';
import { InvalidTokenError } from '../exceptions/InvalidTokenError';
import { CustomTokenExpiredError } from '../exceptions/CustomTokenExpiredError';

interface IJwtData {
  uid: number
}

const getJwtSecret = (): string => {
  const JWTSecret = process.env.JWT_SECRET;
  if (!JWTSecret) {
    throw new JwtSecretNotFoundError('Jwt secret not found');
  }
  return JWTSecret;
};

const generateToken = (data: IJwtData) => {
  return jwt.sign(data, getJwtSecret(), { expiresIn: '1h' });
};

const verify = (token: string): IJwtData => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    if (typeof decoded !== 'object') {
      throw new InvalidTokenError();
    }
    return decoded as IJwtData;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new CustomTokenExpiredError();
    }
    if (error instanceof JsonWebTokenError) {
      throw new InvalidTokenError();
    }
    throw error;
  }
};

export const jwtService = {
  generateToken,
  verify,
};

