import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { InputUserDTOType } from '../../../types/dtos/InputUserDTOType.dto';
import { MOCK_USER } from '../mocks/mockUserConstant';
import { StatusCodes } from 'http-status-codes';
import { ensureAuth } from '../ensureAuth';
import { ErrorMessageEnum } from '../../exceptions/ErrorMessagesEnum';

describe('Test [middlewares ensureAuth]', () => {

  const MOCK_ENDPOINT = '/mock-endpoint-test';
  app.get(MOCK_ENDPOINT, ensureAuth, (req, res) => {
    const {headers, body: data} = req;
    res.status(200).json({
      headers,
      data
    });
  });

  const mockExpiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTcxMDQxMjg1MSwiZXhwIjoxNzEwNDE2NDUxfQ.BEwutaN1IcqFsfKm8vddedddqqydaUoAg-j-2SCEYJg';
  let mockValidToken: string;
  beforeAll(async () => {
    const {
      username,
      email,
      password
    } = MOCK_USER;

    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username,
        email,
        password,
      }as InputUserDTOType)
      .expect(StatusCodes.CREATED);

    await request(app)
      .post(UserRoutesEnum.AUTH)
      .send({
        email,
        password,
      }as InputUserDTOType)
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('accessToken');
        mockValidToken = res.body.accessToken;
      });
  });

  it('should return UNAUTHORIZED status and error message when a token is missing from the request', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
      });
  });
  it('should return UNAUTHORIZED status and error message when an invalid token type has been sent', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .auth('mock-basic-token-user', 'mock-basic-token-pass', { type: 'basic' })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN_MESSAGE);
      });
  });
  it('should return UNAUTHORIZED status and error message when the authorization has only `Bearer`', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .auth('', { type: 'bearer' })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN_MESSAGE);
      });
  });
  it('should return UNAUTHORIZED status and error message when an invalid token has been sent', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .auth('invalid-token', { type: 'bearer' })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN_MESSAGE);
      });
  });
  it('should return UNAUTHORIZED status and error message when an expired token has been sent', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .auth(mockExpiredToken, { type: 'bearer' })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.EXPIRED_TOKEN_MESSAGE);
      });
  });
  it('should set header userId and call next function when a valid token has been sent', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .auth(mockValidToken, { type: 'bearer' })
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('headers');
        expect(res.body.headers).toHaveProperty('userId');
      });
  });
});
