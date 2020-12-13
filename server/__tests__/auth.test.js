const request = require('supertest');
const yup = require('yup');
const JwtService = require('../services/jwtService');
const { sequelize, User } = require('../models');
const { createApp } = require('../app');
const { permissions: { roles } } = require('../configs/config');
const config = require('../configs/config');

const app = createApp();

function getUserData() {
  return {
    firstName: 'Test',
    lastName: 'Testovich',
    displayName: `Test${Date.now()}`,
    email: `test_email${Date.now()}@gmail.com`,
    password: 'Test123456',
    role: roles[0],
  };
}

const userData = getUserData();

const authBodySchema = yup.object({
  data: yup.object({
    user: yup.object().required(),
    tokenPair: yup.object({
      accessToken: yup.string().required(),
      refreshToken: yup.string().required(),
    }).required(),
  }),
}).required();

const authErrorSchema = yup.object({
  errors: yup.array().of(yup.object()).required(),
});

beforeAll(() => User.create(userData));
afterAll(() => sequelize.close());

describe('LOGIN', () => {
  test('User should be able to login successfully', async () => {
    const { status, body } = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password,
    });

    expect(status).toBe(201);
    expect(await authBodySchema.isValid(body)).toBe(true);
  });
  test('User should received 403 status on incorrect credentials', async () => {
    const { status, body } = await request(app).post('/api/auth/login').send({
      email: `bad-email-value${Date.now()}@gmail.com`,
      password: `UJDsad${Date.now()}`,
    });
    expect(status).toBe(403);
    expect(await authErrorSchema.isValid(body)).toBeTruthy();
  });
  test('User must pass credentials to login', async () => {
    const { status, body } = await request(app).post('/api/auth/login').send({});
    expect(status).toBe(400);
    expect(await authErrorSchema.isValid(body)).toBeTruthy();
  });
});

describe('SIGN UP', () => {
  test('User should be able to sign up successfully ', async () => {
    const userSignUpData = getUserData();
    const { status, body } = await request(app).post('/api/auth/signup').send(userSignUpData);
    expect(status).toBe(201);
    expect(await authBodySchema.isValid(body)).toBeTruthy();
  });
  test('User should get bad request error on invalid data sending', async () => {
    const invalidUserSignUpData = {
      firstName: 'Test',
      lastName: 'Testovich',
      displayName: `Test${Date.now()}`,
      email: `test_email${Date.now()}@gmail.com`,
      password: 'test16',
      role: roles[1],
    };
    const { status, body } = await request(app).post('/api/auth/signup').send(invalidUserSignUpData);
    expect(status).toBe(400);
    expect(await authErrorSchema.isValid(body)).toBeTruthy();
  });
  test('User should get conflict error on used email', async () => {
    const userSignUpData = getUserData();
    userSignUpData.email = userData.email;
    const { status, body } = await request(app).post('/api/auth/signup').send(userSignUpData);
    expect(status).toBe(409);
    expect(await authErrorSchema.isValid(body)).toBeTruthy();
  });
});

describe('Authorization', async () => {
  test('Expired access token received Unauthorized error', async () => {
    const expiredAccessToken = await JwtService.sign({}, config.jwt.tokenSecret, {
      expiresIn: '1ms',
    });
    const response = await request(app).get('/api/getContestById').set('Authorization', expiredAccessToken);
    expect(response.status).toBe(401);
    expect(await authErrorSchema.isValid(response.body)).toBeTruthy();
  });
});
