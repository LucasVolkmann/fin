import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { StatusCodes } from 'http-status-codes';
import { MOCK_EMAIL, MOCK_PASSWORD, MOCK_USERNAME } from '../../../mocks/userMocks/mockUserConstant';
import { MOCK_URL } from '../../../mocks/mockURL';
import { UserController } from '..';
import { ErrorMessageEnum } from '../../../shared/exceptions/ErrorMessagesEnum';

describe('Test [controller user create]', () => {
  describe('Test endpoint', () => {
    it('should return an error when username is not sent', async () => {
      await request(app)
        .post(UserRoutesEnum.USER)
        .send({
          email: MOCK_EMAIL,
          password: MOCK_PASSWORD
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('username');
        });
    });
    it('should return an error when email is not sent', async () => {
      await request(app)
        .post(UserRoutesEnum.USER)
        .send({
          username: MOCK_USERNAME,
          password: MOCK_PASSWORD
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('email');
        });
    });
    it('should return an error when password is not sent', async () => {
      await request(app)
        .post(UserRoutesEnum.USER)
        .send({
          username: MOCK_USERNAME,
          email: MOCK_EMAIL
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('password');
        });
    });
    it('should return all invalid fields errors', async () => {
      await request(app)
        .post(UserRoutesEnum.USER)
        .send({
          username: 'a',
          email: 'invalid email',
          password: 'a'
        })
        .expect(StatusCodes.BAD_REQUEST)
        .then((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('body');
          expect(res.body.errors.body).toHaveProperty('username');
          expect(res.body.errors.body).toHaveProperty('email');
          expect(res.body.errors.body).toHaveProperty('password');
        });
    });
  });
  describe('Test controller itself', () => {
    app.post(MOCK_URL, UserController.create);

    it('should return INTERNAL SERVER ERROR when username is missing in body', async () => {
      await request(app)
        .post(MOCK_URL)
        .send({
          email: MOCK_EMAIL,
          password: MOCK_PASSWORD
        })
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
    it('should return INTERNAL SERVER ERROR when email is missing in body', async () => {
      await request(app)
        .post(MOCK_URL)
        .send({
          username: MOCK_USERNAME,
          password: MOCK_PASSWORD
        })
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
    it('should return INTERNAL SERVER ERROR when password is missing in body', async () => {
      await request(app)
        .post(MOCK_URL)
        .send({
          username: MOCK_USERNAME,
          email: MOCK_EMAIL
        })
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
    it('should return an integer more than zero and status CREATED when user is created', async () => {
      await request(app)
        .post(MOCK_URL)
        .send({
          username: MOCK_USERNAME,
          email: MOCK_EMAIL,
          password: MOCK_PASSWORD,
        })
        .expect(StatusCodes.CREATED)
        .then((res) => {
          expect(res.body).toBeGreaterThan(0);
        });
    });
    it('should return INTERNAL SERVER ERROR and email already exists message when email exists', async () => {
      await request(app)
        .post(MOCK_URL)
        .send({
          username: MOCK_USERNAME,
          email: '2' + MOCK_EMAIL,
          password: MOCK_PASSWORD,
        })
        .expect(StatusCodes.CREATED);
      await request(app)
        .post(MOCK_URL)
        .send({
          username: MOCK_USERNAME,
          email: MOCK_EMAIL,
          password: MOCK_PASSWORD,
        })
        .expect(StatusCodes.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body).toHaveProperty('errors', ErrorMessageEnum.EMAIL_ALREADY_EXISTS);
        });
    });
  });
});
