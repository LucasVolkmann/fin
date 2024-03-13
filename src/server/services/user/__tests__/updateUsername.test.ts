import { UpdateResult } from 'typeorm';
import { MOCK_USER } from '../mocks/mockUserConstant';
import { updateUsername } from '../updateUsername';
import { InternalServerError } from '../../../shared/exceptions/InternalServerError';

const mockUpdate = jest.fn()
  .mockImplementation((objId: {id: number}): Promise<UpdateResult> => {
    if (objId.id === MOCK_USER.id) {
      return Promise.resolve({
        raw: [],
        generatedMaps: [],
        affected: 1,
      });
    } else {
      return Promise.resolve({
        raw: [],
        generatedMaps: [],
        affected: 0,
      });
    }
  });
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      update: mockUpdate,
    })
  }
}));

describe('Test [user updateUsername]', () => {
  it('should return UpdateResult with affected more than 0 when no one exception was throw', async () => {
    const userSent = MOCK_USER;

    const updatedUser = await updateUsername(userSent);

    expect(updatedUser).toBeDefined();
    expect(updatedUser).toHaveProperty('affected');
    expect(updatedUser?.affected).toBeGreaterThan(0);
  });
  it('should throw InternalServerError if repository.update() return UpdateResult.affected below 1', async () => {
    const userSent = {
      ...MOCK_USER,
      id: 0,
    };

    await expect(async () => {
      await updateUsername(userSent);
    }).rejects.toThrow(new InternalServerError('Error while updating register.'));
  });
  it('should throw InternalServerError if repository.update() return empty', async () => {
    mockUpdate.mockReturnValueOnce(null);

    await expect(async () => {
      await updateUsername(MOCK_USER);
    }).rejects.toThrow(new InternalServerError('Error while updating register.'));
  });
  it('should throw InternalServerError if repository.update() return UpdateResult without .affected', async () => {
    mockUpdate.mockReturnValueOnce({
      raw: [],
      generatedMaps: [],
    });

    await expect(async () => {
      await updateUsername(MOCK_USER);
    }).rejects.toThrow(new InternalServerError('Error while updating register.'));
  });
});
