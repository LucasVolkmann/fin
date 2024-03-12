import { InvalidCredentialsError } from '../../../shared/exceptions/InvalidCredentialsError';
import { PasswordCrypto } from '../../../shared/functions/hash';
import { OutputUserDTOType } from '../../../types/dtos/OutputUserDTOType.dto';
import { auth } from '../auth';
import { getByEmail } from '../getByEmail';

const MOCK_ID = 1;
const MOCK_USERNAME = 'MOCK_USERNAME';
const MOCK_EMAIL = 'MOCK_EMAIL';
const MOCK_PASSWORD = 'MOCK_PASSWORD';
const MOCK_REGISTRATION_DATE = 'MOCK_REGISTRATION_DATE';
const MOCK_USER: OutputUserDTOType = {
  id: MOCK_ID,
  username: MOCK_USERNAME,
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD,
  registration_date: MOCK_REGISTRATION_DATE
};

jest.mock('../getByEmail');

jest.mock('../../../shared/functions/hash');

describe('Test [auth]', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return an user when credentials are correct.', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(MOCK_USER);
    (PasswordCrypto.verifyPassword as jest.MockedFunction<typeof PasswordCrypto.verifyPassword>)
      .mockResolvedValueOnce(true);
    const user = await auth(MOCK_EMAIL, MOCK_PASSWORD);

    expect(user).toBeDefined();
  });
  it('should throw InvalidCredentialsError when there is no user with the given email.', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(null);

    await expect(async () => {
      await auth(MOCK_EMAIL, MOCK_PASSWORD);
    }).rejects.toThrow(new InvalidCredentialsError());
  });
  it('should throw InvalidCredentialsError when there is an user but password is incorrect.', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(MOCK_USER);
    (PasswordCrypto.verifyPassword as jest.MockedFunction<typeof PasswordCrypto.verifyPassword>)
      .mockResolvedValueOnce(false);

    await expect(async () => {
      await auth(MOCK_EMAIL, MOCK_PASSWORD);
    }).rejects.toThrow(new InvalidCredentialsError());
    expect(PasswordCrypto.verifyPassword).toHaveBeenCalled();
  });
});