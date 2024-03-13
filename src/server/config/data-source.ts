import { DataSource } from 'typeorm';
import { DevEnvDataSourceOptions, TestEnvDataSourceOptions } from './Environment';

const getDataSource = () => {
  switch(process.env.NODE_ENV){
  case 'dev':
    return DevEnvDataSourceOptions;
  case 'test':
    return TestEnvDataSourceOptions;
  default:
    return DevEnvDataSourceOptions;
  }
};

export const AppDataSource = new DataSource(getDataSource());


