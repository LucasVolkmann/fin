import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_EMAIL, MOCK_INPUT_USER, MOCK_PASSWORD, MOCK_USERNAME } from '../../../mocks/userMocks/mockUserConstant';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from '../../../shared/exceptions/ErrorMessagesEnum';

describe('Test [controller user update username]', () => {

  let validToken: string;
  beforeAll( async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send(MOCK_INPUT_USER)
      .expect(StatusCodes.CREATED);
    await request(app)
      .post(UserRoutesEnum.AUTH)
      .send({
        email: MOCK_INPUT_USER.email,
        password: MOCK_INPUT_USER.password
      })
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('accessToken');
        validToken = res.body.accessToken;
      });
  });

  it('should return an UNAUTHORIZED status when request has not an access token', async () => {
    await request(app)
      .put(UserRoutesEnum.USER)
      .send(MOCK_INPUT_USER)
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.TOKEN_REQUIRED);
      });
  });
  it('should return an UNAUTHORIZED status when token is invalid', async () => {
    await request(app)
      .put(UserRoutesEnum.USER)
      .auth('invalid-token', {type:'bearer'})
      .send(MOCK_INPUT_USER)
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN);
      });
  });
  it('should return an error when username is not sent', async () => {
    await request(app)
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
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
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
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
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
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
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
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
  it('should return INTERNAL SERVER ERROR status when body user not exists', async () => {
    await request(app)
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
      .send({
        username: 'MOCK_UPDATED_USERNAME',
        email: 'MOCK_INEXISTENT@email.com',
        password: MOCK_INPUT_USER.password,
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR);
  });
  it('should return UNAUTHORIZED status when body user and user token are different', async () => {
    const MOCK_OTHER_USER = {
      username: 'other_' + MOCK_INPUT_USER.username,
      email: 'other_' + MOCK_INPUT_USER.email,
      password: 'other_' + MOCK_INPUT_USER.password,
    };

    await request(app)
      .post(UserRoutesEnum.USER)
      .send(MOCK_OTHER_USER)
      .expect(StatusCodes.CREATED);

    await request(app)
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
      .send({
        username: MOCK_OTHER_USER.username,
        email: MOCK_OTHER_USER.email,
        password: MOCK_OTHER_USER.password,
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', 'Invalid credentials.');
      });
  });
  it('should return NO CONTENT status when update has been successful', async () => {
    const MOCK_UPDATED_USERNAME = 'mock_updated_username';
    await request(app)
      .put(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .send({
        ...MOCK_INPUT_USER,
        username: MOCK_UPDATED_USERNAME
      })
      .expect(StatusCodes.NO_CONTENT);
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('username', MOCK_UPDATED_USERNAME);
      });
  });
});
