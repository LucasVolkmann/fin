import { OutputUserDTOType } from '../../../types/dtos/user/OutputUserDTOType.dto';
import { getByEmail } from '../getByEmail';
import { MOCK_EMAIL, MOCK_OUTPUT_USER} from '../../../mocks/userMocks/mockUserConstant';


const mockFindOneBy = jest.fn()
  .mockImplementation((): Promise<OutputUserDTOType> => {
    return Promise.resolve(MOCK_OUTPUT_USER);
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
