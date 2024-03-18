import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_EMAIL, MOCK_INPUT_USER, MOCK_PASSWORD, MOCK_USERNAME } from '../../../mocks/userMocks/mockUserConstant';
import { StatusCodes } from 'http-status-codes';

describe('Test [controller user deleteById]', () => {

  const MOCK_AUTH_USER = {
    username: 'AUTH_' + MOCK_USERNAME,
    email: 'AUTH_' + MOCK_EMAIL,
    password: 'AUTH_' + MOCK_PASSWORD,
  };
  let validToken: string;
  beforeAll(async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send(MOCK_AUTH_USER)
      .expect(StatusCodes.CREATED)
      .then((res) => {
        expect(res.body).toBeGreaterThan(0);
      });
    await request(app)
      .post(UserRoutesEnum.AUTH)
      .send({
        email: MOCK_AUTH_USER.email,
        password: MOCK_AUTH_USER.password,
      })
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('accessToken');
        validToken = res.body.accessToken;
      });
  });

  it('should return an BAD REQUEST status when request has not an access token', async () => {
    await request(app)
      .delete(UserRoutesEnum.USER)
      .send({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      })
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', 'Token is required for authentication.');
      });
  });
  it('should return an error if request has not an email', async () => {

    await request(app)
      .delete(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
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
      .delete(UserRoutesEnum.USER)
      .auth(validToken, { type: 'bearer'})
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
      .delete(UserRoutesEnum.USER)
      .auth(validToken, { type: 'bearer'})
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
      .delete(UserRoutesEnum.USER)
      .auth(validToken, { type: 'bearer'})
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
  it('should return INTERNAL SERVER ERROR when token user id and credential user id are different', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send(MOCK_INPUT_USER)
      .expect(StatusCodes.CREATED);
    await request(app)
      .delete(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
      .send({
        email: MOCK_INPUT_USER.email,
        password: MOCK_INPUT_USER.password
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', 'Error while deleting register.');
      });
  });
  it('should return NO_CONTENT status when the user has been successful deleted', async () => {
    await request(app)
      .delete(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
      .send({
        email: MOCK_AUTH_USER.email,
        password: MOCK_AUTH_USER.password
      })
      .expect(StatusCodes.NO_CONTENT);
  });

});

