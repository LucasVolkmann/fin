import { InvalidCredentialsError } from '../../../shared/exceptions/InvalidCredentialsError';
import { PasswordCrypto } from '../../../shared/functions/hash';
import { auth } from '../auth';
import { getByEmail } from '../getByEmail';
import { MOCK_EMAIL, MOCK_PASSWORD, MOCK_OUTPUT_USER} from '../../../mocks/userMocks/mockUserConstant';

jest.mock('../getByEmail');
jest.mock('../../../shared/functions/hash');

describe('Test [user auth]', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return an user when credentials are correct.', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(MOCK_OUTPUT_USER);
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
      .mockResolvedValueOnce(MOCK_OUTPUT_USER);
    (PasswordCrypto.verifyPassword as jest.MockedFunction<typeof PasswordCrypto.verifyPassword>)
      .mockResolvedValueOnce(false);

    await expect(async () => {
      await auth(MOCK_EMAIL, MOCK_PASSWORD);
    }).rejects.toThrow(new InvalidCredentialsError());
    expect(PasswordCrypto.verifyPassword).toHaveBeenCalled();
  });
});