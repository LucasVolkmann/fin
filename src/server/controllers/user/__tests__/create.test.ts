import request from 'supertest';
import app from '../../../Server';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { StatusCodes } from 'http-status-codes';
import { MOCK_EMAIL, MOCK_PASSWORD, MOCK_USERNAME } from '../../../mocks/userMocks/mockUserConstant';
import { ErrorMessageEnum } from '../../../shared/exceptions/ErrorMessagesEnum';

describe('Test [controller user create]', () => {

  it('should return BAD REQUEST when username is missing in body', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST when email is missing in body', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username: MOCK_USERNAME,
        password: MOCK_PASSWORD
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST when password is missing in body', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username: MOCK_USERNAME,
        email: MOCK_EMAIL
      })
      .expect(StatusCodes.BAD_REQUEST);
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
  it('should return an integer more than zero and status CREATED when user is created', async () => {
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
  });
  it('should return CONFLICT status and email already exists message when email exists', async () => {
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username: MOCK_USERNAME,
        email: '2' + MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
      .expect(StatusCodes.CREATED);
    await request(app)
      .post(UserRoutesEnum.USER)
      .send({
        username: MOCK_USERNAME,
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      })
      .expect(StatusCodes.CONFLICT)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', ErrorMessageEnum.EMAIL_ALREADY_EXISTS);
      });
  });

});
