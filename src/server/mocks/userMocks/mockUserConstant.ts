import { InputUserDTOType } from '../../types/dtos/user/InputUserDTOType.dto';
import { OutputUserDTOType } from '../../types/dtos/user/OutputUserDTOType.dto';

export const MOCK_ID = 1;
export const MOCK_USERNAME = 'mock_username';
export const MOCK_EMAIL = 'mock@email.com';
export const MOCK_PASSWORD = 'mock_password';
export const MOCK_REGISTRATION_DATE = 'mock_registration_date';

//FIXME: refactor mocked users logic

export const MOCK_OUTPUT_USER: OutputUserDTOType = {
  id: MOCK_ID,
  username: MOCK_USERNAME,
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD,
  registration_date: MOCK_REGISTRATION_DATE
};
export const MOCK_INPUT_USER: InputUserDTOType = {
  username: MOCK_USERNAME,
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD,
};