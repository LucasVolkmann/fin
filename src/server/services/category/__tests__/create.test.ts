import { CategoryService } from '..';
import { MOCK_OUTPUT_USER } from '../../../mocks/userMocks/mockUserConstant';
import { CategoryNameAlreadyInUseError } from '../../../shared/exceptions/CategoryNameAlreadyInUseError';
import { InternalServerError } from '../../../shared/exceptions/InternalServerError';
import { getByName } from '../getByName';

const mockSave = jest.fn();
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      save: mockSave,
    })
  }
}));
jest.mock('../getByName');

const MOCK_CATEGORY = {
  id: 1,
  name: 'mock name',
  user: MOCK_OUTPUT_USER,
};

describe('Test [service category create]', () => {
  it('should throw CategoryNameAlreadyInUseError when name is already in use', async () => {
    (getByName as jest.MockedFunction<typeof getByName>)
      .mockResolvedValueOnce(MOCK_CATEGORY);

    await expect(async () => {
      await CategoryService.create('mock name', MOCK_OUTPUT_USER.id);
    }).rejects.toThrow(new CategoryNameAlreadyInUseError());
  });
  it('should call [repository.save()] if the name is not being used', async () => {
    (getByName as jest.MockedFunction<typeof getByName>)
      .mockResolvedValueOnce(null);
    mockSave.mockResolvedValueOnce({
      id: 1
    });

    const MOCK_NAME = 'mock name';
    const MOCK_ID = 1;

    await CategoryService.create(MOCK_NAME, MOCK_ID);

    expect(mockSave).toHaveBeenCalledWith({ name: MOCK_NAME, user: { id: MOCK_ID } });
  });
  it('should throw InternalServerError when repository.save do not return a valid id', async () => {
    (getByName as jest.MockedFunction<typeof getByName>)
      .mockResolvedValueOnce(null);
    mockSave.mockResolvedValueOnce({id: null});

    await expect(async () => {
      await CategoryService.create('mock name', 1);
    }).rejects.toThrow(new InternalServerError('Error while creating a category.'));
  });
  it('should return the id of the new category when save has been successful', async () => {
    (getByName as jest.MockedFunction<typeof getByName>)
      .mockResolvedValueOnce(null);
    mockSave.mockResolvedValueOnce({id: 1});

    const newId = await CategoryService.create('mock name', 1);

    expect(newId).toBeGreaterThan(0);
  });
});
