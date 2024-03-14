import { AppDataSource } from './src/server/config/data-source';


beforeAll(async () => {
  await AppDataSource.initialize().catch((error) => {
    console.log(error);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});

