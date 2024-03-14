import { Request, Response } from 'express';
import app from '../../../Server';
import { validateData } from '../validateData';
import * as yup from 'yup';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

describe('Test [middleware validateData]', () => {

  interface MockBodySchemaInterface {
    stringField: string,
    numberField: number
  }
  interface MockParamsSchemaInterface {
    numberField: number
  }
  interface MockQuerySchemaInterface {
    stringField: string,
    numberField: number
  }

  const mockDataValidator = validateData((getSchema) => ({
    params: getSchema<MockParamsSchemaInterface>(yup.object().shape({
      numberField: yup.number().required(),
    })),
    query: getSchema<MockQuerySchemaInterface>(yup.object().shape({
      stringField: yup.string().required(),
      numberField: yup.number().required(),
    })),
    body: getSchema<MockBodySchemaInterface>(yup.object().shape({
      stringField: yup.string().required(),
      numberField: yup.number().required(),
    })),
  }));

  const MOCK_ENDPOINT = '/mock-endpoint-test';
  app.get(`${MOCK_ENDPOINT}`, mockDataValidator, (req: Request, res: Response) => {
    const {params, query, body: data} = req;
    res.status(StatusCodes.OK).json({
      params,
      query,
      data
    });
  });
  app.get(`${MOCK_ENDPOINT}/:numberField`, mockDataValidator, (req: Request, res: Response) => {
    const {params, query, body: data} = req;
    res.status(StatusCodes.OK).json({
      params,
      query,
      data
    });
  });

  it('should return error message of each missing field', async () => {

    await request(app)
      .get(MOCK_ENDPOINT)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');

        expect(res.body.errors).toHaveProperty('params');
        expect(res.body.errors.params).toHaveProperty('numberField');

        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('stringField');
        expect(res.body.errors.query).toHaveProperty('numberField');

        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('stringField');
        expect(res.body.errors.body).toHaveProperty('numberField');

      });
  });
  it('should return error message of each missing field (sending one field of each path)', async () => {

    await request(app)
      .get(`${MOCK_ENDPOINT}/1?stringField=mock-string`)
      .expect(StatusCodes.BAD_REQUEST)
      .send({
        stringField: 'mock-string'
      })
      .then((res) => {
        expect(res.body).toHaveProperty('errors');

        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).not.toHaveProperty('stringField');
        expect(res.body.errors.query).toHaveProperty('numberField');

        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).not.toHaveProperty('stringField');
        expect(res.body.errors.body).toHaveProperty('numberField');
      });
  });
  it('should return specific message for field issue', async () => {

    await request(app)
      .get(`${MOCK_ENDPOINT}/1?stringField=mock-string&numberField=a`)
      .expect(StatusCodes.BAD_REQUEST)
      .send({
        stringField: 'mock-string',
        numberField: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty('errors');

        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('numberField');
        expect(res.body.errors.query.numberField).toContain('number');
      });
  });
  it('should call next function when the parameters are OK', async () => {

    await request(app)
      .get(`${MOCK_ENDPOINT}/1?stringField=mock-string&numberField=1`)
      .expect(StatusCodes.OK)
      .send({
        stringField: 'mock-string',
        numberField: 1,
      });
  });
});
