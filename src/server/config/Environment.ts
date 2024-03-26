import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

export const DevEnvDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/server/models/*.ts'],
  subscribers: [],
  migrations: ['src/server/config/migrations/*.ts'],
};

export const TestEnvDataSourceOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database: ':memory:',
  entities: ['src/server/models/*.ts'],
  migrations: ['./migrations'],
  logging: false,
  synchronize: true
};
