import express from 'express';

const app = express();

app.get('/', (_, res) => {
  return res.status(200).send('OK');
});

export default app;
