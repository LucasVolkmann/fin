import app from './server/Server';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
