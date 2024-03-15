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

  describe('Test endpoint', () => {
    it('should return an error if request has not an email', async () => {

      await request(app)
        .post(UserRoutesEnum.AUTH)
        .send({
          password: MOCK_PASSWORD
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('email');
          expect(res.body.errors.body).not.toHaveProperty('password');
        });
    });
    it('should return an error if request has not a valid email', async () => {

      await request(app)
        .post(UserRoutesEnum.AUTH)
        .send({
          email: 'invalid email',
          password: MOCK_PASSWORD,
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('email');
          expect(res.body.errors.body).not.toHaveProperty('password');
        });
    });
    it('should return an error if request has not a password', async () => {

      await request(app)
        .post(UserRoutesEnum.AUTH)
        .send({
          email: MOCK_EMAIL
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('password');
          expect(res.body.errors.body).not.toHaveProperty('email');
        });
    });
    it('should return an error if request has not a valid password', async () => {

      await request(app)
        .post(UserRoutesEnum.AUTH)
        .send({
          email: MOCK_EMAIL,
          password: 'p'
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('password');
          expect(res.body.errors.body).not.toHaveProperty('email');
        });
    });
    
  });

  describe('Test controller itself', () => {
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
});