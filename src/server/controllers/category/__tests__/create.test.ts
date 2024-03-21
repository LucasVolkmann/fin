import request from 'supertest';
import app from '../../../Server';
import { CategoryRoutesEnum } from '../../../routes/categoryRouter';
import { StatusCodes } from 'http-status-codes';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_INPUT_USER } from '../../../mocks/userMocks/mockUserConstant';

describe('Test [controller category create]', () => {

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

  it('should return BAD_REQUEST status if request has not a token', async () => {
    const mock_name_1 = 'mock_name_1';
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .send({
        name: mock_name_1,
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD_REQUEST status if the name is missing in body', async () => {
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return CONFLICT status when the name as already in use', async () => {
    const mock_name_1 = 'mock_name_1';
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .send({
        name: mock_name_1,
      })
      .expect(StatusCodes.CREATED);
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .send({
        name: mock_name_1,
      })
      .expect(StatusCodes.CONFLICT)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', 'This category name is already in use.');
      });
  });
  it('should return INTERNAL SERVER ERROR when the user in token has been deleted', async () => {
    await request(app)
      .delete(UserRoutesEnum.USER)
      .auth(validToken, {type: 'bearer'})
      .send({
        email: MOCK_INPUT_USER.email,
        password: MOCK_INPUT_USER.password,
      })
      .expect(StatusCodes.NO_CONTENT);
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .send({
        name: 'mock_name',
      })
      .expect(StatusCodes.NOT_FOUND)
      .then((res) => {
        expect(res.body).toHaveProperty('errors', 'Register not found.');
      });
  });
});
