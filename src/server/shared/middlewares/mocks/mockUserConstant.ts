import { OutputUserDTOType } from '../../../types/dtos/OutputUserDTOType.dto';

export const MOCK_ID = 1;
export const MOCK_USERNAME = 'MOCK_USERNAME';
export const MOCK_EMAIL = 'MOCK@EMAIL.COM';
export const MOCK_PASSWORD = 'MOCK_PASSWORD';
export const MOCK_REGISTRATION_DATE = 'MOCK_REGISTRATION_DATE';
export const MOCK_USER: OutputUserDTOType = {
  id: MOCK_ID,
  username: MOCK_USERNAME,
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD,
  registration_date: MOCK_REGISTRATION_DATE
};