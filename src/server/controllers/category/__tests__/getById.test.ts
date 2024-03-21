import request from 'supertest';
import app from '../../../Server';
import { StatusCodes } from 'http-status-codes';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_INPUT_USER } from '../../../mocks/userMocks/mockUserConstant';
import { CategoryRoutesEnum } from '../../../routes/categoryRouter';

describe('Test [controller category getById]', () => {

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
    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', '1'))
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST when id path param is not a number', async () => {
    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', 'Non number'))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST when id path param is not a integer', async () => {
    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', '1.5'))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD REQUEST when id path param is below than zero', async () => {
    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', '-1'))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return NOT FOUND when category do not exists', async () => {
    const response = await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .send({
        name: 'mock_name'
      })
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.CREATED);
    expect(Number.isInteger(response.body)).toEqual(true);
    const categoryId = response.body;

    await request(app)
      .delete(CategoryRoutesEnum.CATEGORY_ID.replace(':id', categoryId))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.NO_CONTENT);

    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', categoryId))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.NOT_FOUND);
  });
  it('should return OK if the request has been successful', async () => {
    const response = await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .send({
        name: 'mock_name'
      })
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.CREATED);
    expect(Number.isInteger(response.body)).toEqual(true);
    const categoryId = response.body;

    await request(app)
      .get(CategoryRoutesEnum.CATEGORY_ID.replace(':id', categoryId))
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('id');
      });
  });
});
