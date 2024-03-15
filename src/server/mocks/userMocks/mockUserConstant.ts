import { OutputUserDTOType } from '../../types/dtos/OutputUserDTOType.dto';

export const MOCK_ID = 1;
export const MOCK_USERNAME = 'mock_username';
export const MOCK_EMAIL = 'mock@email.com';
export const MOCK_PASSWORD = 'mock_password';
export const MOCK_REGISTRATION_DATE = 'mock_registration_date';
export const MOCK_USER: OutputUserDTOType = {
  id: MOCK_ID,
  username: MOCK_USERNAME,
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD,
  registration_date: MOCK_REGISTRATION_DATE
};