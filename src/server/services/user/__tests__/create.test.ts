import { EmailAlreadyExistsError } from '../../../shared/exceptions/EmailAlreadyExistsError';
import { InternalServerError } from '../../../shared/exceptions/InternalServerError';
import { PasswordCrypto } from '../../../shared/functions/hash';
import { InputUserDTOType } from '../../../types/dtos/user/InputUserDTOType.dto';
import { OutputUserDTOType } from '../../../types/dtos/user/OutputUserDTOType.dto';
import { create } from '../create';
import { getByEmail } from '../getByEmail';
import { MOCK_ID, MOCK_PASSWORD, MOCK_REGISTRATION_DATE, MOCK_OUTPUT_USER, MOCK_INPUT_USER} from '../../../mocks/userMocks/mockUserConstant';

const mockSave = jest.fn()
  .mockImplementation((user: InputUserDTOType): OutputUserDTOType => ({
    ...user,
    id: MOCK_ID,
    registration_date: MOCK_REGISTRATION_DATE,
  }));
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      save: mockSave,
    })
  }
}));
jest.mock('../../../shared/functions/hash');
jest.mock('../getByEmail');

describe('Test [user create]', () => {
  afterAll(() => jest.clearAllMocks());
  it('should throw EmailAlreadyExistsError when getByEmail return an email', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(MOCK_OUTPUT_USER);

    await expect(async () => {
      await create(MOCK_INPUT_USER);
    }).rejects.toThrow(new EmailAlreadyExistsError());
  });
  it('should generate and send to repository a hashed password', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(null);
    const MOCK_HASH_FLAG = 'HASHED';
    const MOCK_HASH_PASSWORD = MOCK_PASSWORD + MOCK_HASH_FLAG;
    (PasswordCrypto.hashPassword as jest.MockedFunction<typeof PasswordCrypto.hashPassword>)
      .mockResolvedValueOnce(MOCK_HASH_PASSWORD);

    await create(MOCK_INPUT_USER);

    expect(mockSave).toHaveBeenCalledWith({
      username: MOCK_INPUT_USER.username,
      email: MOCK_INPUT_USER.email,
      password: MOCK_HASH_PASSWORD,
    });
    expect(PasswordCrypto.hashPassword).toHaveBeenCalled();
  });
  it('should return only user id when repository.save() return an user with id', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(null);
    const MOCK_HASH_FLAG = 'HASHED';
    const MOCK_HASH_PASSWORD = MOCK_PASSWORD + MOCK_HASH_FLAG;
    (PasswordCrypto.hashPassword as jest.MockedFunction<typeof PasswordCrypto.hashPassword>)
      .mockResolvedValueOnce(MOCK_HASH_PASSWORD);

    const id = await create(MOCK_INPUT_USER);

    expect(mockSave).toHaveBeenCalled();
    expect(id).toBeGreaterThan(0);
  });
  it('should throw InternalServerError when repository.save() do not return an user with id', async () => {
    (getByEmail as jest.MockedFunction<typeof getByEmail>)
      .mockResolvedValueOnce(null);
    const MOCK_HASH_FLAG = 'HASHED';
    const MOCK_HASH_PASSWORD = MOCK_PASSWORD + MOCK_HASH_FLAG;
    (PasswordCrypto.hashPassword as jest.MockedFunction<typeof PasswordCrypto.hashPassword>)
      .mockResolvedValueOnce(MOCK_HASH_PASSWORD);

    mockSave.mockReturnValueOnce(null);

    await expect(async () => {
      await create(MOCK_INPUT_USER);
    }).rejects.toThrow(new InternalServerError('Error while creating user.'));
    expect(mockSave).toHaveBeenCalled();
  });
});
