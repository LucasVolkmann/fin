import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_INPUT_USER, MOCK_OUTPUT_USER } from '../../../mocks/userMocks/mockUserConstant';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from '../../../shared/exceptions/ErrorMessagesEnum';

describe('Test [controller user getUserByToken]', () => {

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

  it('should return BAD REQUEST if the request has not a token', async () => {
    await request(app)
      .get(UserRoutesEnum.USER)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.TOKEN_REQUIRED);
      });
  });
  it('should return UNAUTHORIZED if the request has an invalid token', async () => {
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth('invalid-token', {type:'bearer'})
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN);
      });
  });
  it('should return an user with username if the search has been successful', async () => {
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('username', MOCK_OUTPUT_USER.username);
      });
  });
  it('should return an user with email if the search has been successful', async () => {
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('email', MOCK_OUTPUT_USER.email);
      });
  });
  it('should return an user with id if the search has been successful', async () => {
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('id', MOCK_OUTPUT_USER.id);
      });
  });
  it('should return NOT FOUND if the user has been deleted', async () => {
    await request(app)
      .delete(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .send({
        email: MOCK_INPUT_USER.email,
        password: MOCK_INPUT_USER.password
      })
      .expect(StatusCodes.NO_CONTENT);
    await request(app)
      .get(UserRoutesEnum.USER)
      .auth(validToken, {type:'bearer'})
      .expect(StatusCodes.NOT_FOUND)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.REGISTER_NOT_FOUND);
      });
  });
});
