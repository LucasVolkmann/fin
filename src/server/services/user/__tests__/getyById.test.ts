import { RegisterNotFoundError } from '../../../shared/exceptions/RegisterNotFoundError';
import { OutputUserDTOType } from '../../../types/dtos/OutputUserDTOType.dto';
import { getById } from '../getById';
import { MOCK_ID, MOCK_USER } from '../../../mocks/userMocks/mockUserConstant';

const mockFindOneBy = jest.fn()
  .mockImplementation((objId: {id: number}): Promise<OutputUserDTOType | null> => {
    if (objId.id === MOCK_USER.id) {
      return Promise.resolve(MOCK_USER);
    } else {
      return Promise.resolve(null);
    }
  });
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      findOneBy: mockFindOneBy,
    })
  }
}));

describe('Test [user getById]', () => {
  afterAll(() => jest.clearAllMocks());
  it('should return an user when repository.find() return an user', async () => {
    const idSent = MOCK_ID;

    const user = await getById(idSent);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('id', idSent);
  });
  it('should throw a RegisterNotFoundError when repository.find() return empty', async () => {
    const idSent = 0;

    await expect(async () => {
      await getById(idSent);
    }).rejects.toThrow(new RegisterNotFoundError());
  });
});
