import { OutputUserDTOType } from '../../../types/dtos/OutputUserDTOType.dto';
import { getByEmail } from '../getByEmail';
import { MockTestError } from '../mocks/MockTestError';
import { MOCK_EMAIL, MOCK_USER } from '../mocks/mockUserConstant';


const mockFindOneBy = jest.fn()
  .mockImplementation((objEmail: {email: string}): Promise<OutputUserDTOType | void> => {
    if (objEmail.email === MOCK_USER.email) {
      return Promise.resolve(MOCK_USER);
    }
    throw new MockTestError();
  });
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      findOneBy: mockFindOneBy,
    })
  }
}));


describe('Test [user getByEmail]', () => {
  afterAll(() => jest.clearAllMocks());
  it('should return a user when no one exception was throw', async () => {
    const emailSent = MOCK_EMAIL;

    const user = await getByEmail(emailSent);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', emailSent);
  });
});
