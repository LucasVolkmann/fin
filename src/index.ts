import app from './server/Server';
import { AppDataSource } from './server/config/data-source';

import 'reflect-metadata';

AppDataSource.initialize().then(() => {
  console.log('Database connection has been successful.');
}).catch((error) => {
  console.log(error);
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
