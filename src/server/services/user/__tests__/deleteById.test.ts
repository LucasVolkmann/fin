import { UpdateResult } from 'typeorm';
import { deleteById } from '../deleteById';
import { InternalServerError } from '../../../shared/exceptions/InternalServerError';


const mockSoftDelete = jest.fn()
  .mockImplementation((id: { id:number }): UpdateResult => ({
    generatedMaps: [],
    raw: [],
    affected: id.id
  }));
jest.mock('../../../config/data-source', () => ({
  AppDataSource: {
    getRepository: () => ({
      softDelete: mockSoftDelete,
    })
  }
}));

describe('Test [user deleteById]', () => {
  afterAll(() => jest.clearAllMocks());
  it('should return the number of the rows affected when send a valid user id', async () => {
    const rowsAffected = await deleteById(1);

    expect(mockSoftDelete).toHaveBeenCalled();
    expect(rowsAffected).toBeGreaterThan(0);
  });
  it('should throw InternalServerError when repository.delete() return void', async () => {
    mockSoftDelete.mockReturnValueOnce(null);

    await expect(async () => {
      await deleteById(1);
    }).rejects.toThrow(new InternalServerError('Error while deleting register.'));
    expect(mockSoftDelete).toHaveBeenCalled();
  });
  it('should throw InternalServerError when repository.delete() return an UpdateResult without affected attribute', async () => {
    mockSoftDelete.mockReturnValueOnce({});

    await expect(async () => {
      await deleteById(1);
    }).rejects.toThrow(new InternalServerError('Error while deleting register.'));
    expect(mockSoftDelete).toHaveBeenCalled();
  });
  it('should throw InternalServerError when repository.delete() return affected rows equals zero', async () => {
    mockSoftDelete.mockReturnValueOnce({ affected: 0 });

    await expect(async () => {
      await deleteById(1);
    }).rejects.toThrow(new InternalServerError('Error while deleting register.'));
    expect(mockSoftDelete).toHaveBeenCalled();
  });
  it('should throw InternalServerError when repository.delete() return affected rows below zero', async () => {
    mockSoftDelete.mockReturnValueOnce({ affected: -1 });

    await expect(async () => {
      await deleteById(1);
    }).rejects.toThrow(new InternalServerError('Error while deleting register.'));
    expect(mockSoftDelete).toHaveBeenCalled();
  });
});
