import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { InputUserDTOType } from '../../../types/dtos/InputUserDTOType.dto';
import { MOCK_INPUT_USER } from '../../../mocks/userMocks/mockUserConstant';
import { StatusCodes } from 'http-status-codes';
import { ensureAuth } from '../ensureAuth';
import { ErrorMessageEnum } from '../../exceptions/ErrorMessagesEnum';
import { MOCK_URL } from '../../../mocks/mockURL';

describe('Test [middlewares ensureAuth]', () => {

  const MOCK_URL_AUTH = MOCK_URL;
  app.get(MOCK_URL_AUTH, ensureAuth, (req, res) => {
    const {headers, body: data} = req;
    res.status(200).json({
      headers,
      data
    });
  });

  let mockValidToken: string;
  beforeAll(async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send(MOCK_INPUT_USER)
      .expect(StatusCodes.CREATED);

    await request(app)
      .post(UserRoutesEnum.AUTH)
      .send({
        email: MOCK_INPUT_USER.email,
        password: MOCK_INPUT_USER.password,
      }as InputUserDTOType)
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('accessToken');
        mockValidToken = res.body.accessToken;
      });
  });

  it('should return BAD REQUEST status and error message when a token is missing from the request', async () => {

    await request(app)
      .get(MOCK_URL_AUTH)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
      });
  });
  it('should return BAD REQUEST status and error message when an invalid token type has been sent', async () => {

    await request(app)
      .get(MOCK_URL_AUTH)
      .auth('mock-basic-token-user', 'mock-basic-token-pass', { type: 'basic' })
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN);
      });
  });
  it('should return BAD REQUEST status and error message when the authorization has only `Bearer`', async () => {

    await request(app)
      .get(MOCK_URL_AUTH)
      .auth('', { type: 'bearer' })
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN);
      });
  });
  it('should return UNAUTHORIZED status and error message when an invalid token has been sent', async () => {

    await request(app)
      .get(MOCK_URL_AUTH)
      .auth('invalid-token', { type: 'bearer' })
      .expect(StatusCodes.UNAUTHORIZED)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.INVALID_TOKEN);
      });
  });
  it('should set header userId and call next function when a valid token has been sent', async () => {

    await request(app)
      .get(MOCK_URL_AUTH)
      .auth(mockValidToken, { type: 'bearer' })
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('headers');
        expect(res.body.headers).toHaveProperty('userId');
      });
  });
});
