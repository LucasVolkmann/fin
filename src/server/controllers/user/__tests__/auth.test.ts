import request from 'supertest';
import app from '../../../Server';
import { UserController } from '..';
import { StatusCodes } from 'http-status-codes';
import { UserRoutesEnum } from '../../../routes/userRouter';

describe('Test [controller user auth]', () => {

  const MOCK_URL = '/mock';
  const MOCK_USERNAME = 'MOCK_USERNAME';
  const MOCK_EMAIL = 'MOCK@EMAIL.com';
  const MOCK_PASSWORD = 'MOCK_PASSWORD';
  app.post(MOCK_URL, UserController.auth);

  it('should return BAD REQUEST status when request body do not have an email', async () => {
    await request(app)
      .post(MOCK_URL)
      .send({ password: MOCK_PASSWORD })
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST status when request body do not have an password', async () => {
    await request(app)
      .post(MOCK_URL)
      .send({ email: MOCK_EMAIL })
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return INTERNAL SERVER ERROR status when user do not exists', async () => {

    await request(app)
      .post(MOCK_URL)
      .send({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
      });
  });
  it('should return OK status and an access token when [UserService.auth] return an user', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username: MOCK_USERNAME,
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
      .expect(StatusCodes.CREATED)
      .then((res) => {
        expect(res.body).toBeGreaterThan(0);
      });
    await request(app)
      .post(MOCK_URL)
      .send({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('accessToken');
      });
  });
});
