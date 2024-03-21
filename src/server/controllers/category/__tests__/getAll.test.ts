import request from 'supertest';
import app from '../../../Server';
import { StatusCodes } from 'http-status-codes';
import { UserRoutesEnum } from '../../../routes/userRouter';
import { MOCK_INPUT_USER } from '../../../mocks/userMocks/mockUserConstant';
import { CategoryRoutesEnum } from '../../../routes/categoryRouter';
import { Category } from '../../../models/Category';

describe('Test [controller category getAll]', () => {

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
      .get(CategoryRoutesEnum.CATEGORY)
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD_REQUEST status if filter query param length is below than 3', async () => {
    const filterValue = 'aa';
    await request(app)
      .get(`${CategoryRoutesEnum.CATEGORY}?filter=${filterValue}`)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD_REQUEST status if filter query param length is above than 100', async () => {
    const filterValue = '0123456789';
    const filterValue10 =
      filterValue + filterValue + filterValue + filterValue + filterValue +
      filterValue + filterValue + filterValue + filterValue + filterValue + 'a';
    await request(app)
      .get(`${CategoryRoutesEnum.CATEGORY}?filter=${filterValue10}`)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return BAD_REQUEST status if the length of the filter query param is above than 100', async () => {
    const filterValue = '0123456789';
    const filterValue10 =
      filterValue + filterValue + filterValue + filterValue + filterValue +
      filterValue + filterValue + filterValue + filterValue + filterValue + 'a';
    await request(app)
      .get(`${CategoryRoutesEnum.CATEGORY}?filter=${filterValue10}`)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.BAD_REQUEST);
  });
  it('should return OK status when getAll has been successful and sent without filter', async () => {
    await request(app)
      .get(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body instanceof Array).toEqual(true);
      });
  });
  it('should return OK status when getAll has been successful and sent with a filter', async () => {
    const filterValue = 'mock filter';
    await request(app)
      .get(`${CategoryRoutesEnum.CATEGORY}?filter=${filterValue}`)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body instanceof Array).toEqual(true);
      });
  });
  it('should return only categories that match with the filter', async () => {
    const mock_name_1 = 'mock_name_1';
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .send({
        name: mock_name_1,
      })
      .expect(StatusCodes.CREATED);

    const mock_name_2 = 'mock_name_2';
    await request(app)
      .post(CategoryRoutesEnum.CATEGORY)
      .auth(validToken, {type: 'bearer'})
      .send({
        name: mock_name_2,
      })
      .expect(StatusCodes.CREATED);

    const filterValue = mock_name_2;
    await request(app)
      .get(`${CategoryRoutesEnum.CATEGORY}?filter=${filterValue}`)
      .auth(validToken, {type: 'bearer'})
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body instanceof Array).toEqual(true);
        res.body.forEach((category: Category) => {
          expect(category.name).not.toEqual(mock_name_1);
        });
      });
  });
});
