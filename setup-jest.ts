import request from 'supertest';
import app from './src/server/Server';
import { AppDataSource } from './src/server/config/data-source';

const mockServer = request.agent(app);

beforeAll(async () => {
  await AppDataSource.initialize().catch((error) => {
    console.log(error);
  });
});

afterAll(() => {
  AppDataSource.destroy();
  jest.restoreAllMocks();
});

export default mockServer;
