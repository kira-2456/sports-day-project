import request from 'supertest';
import app from 'app';
import { UserErrorType } from 'enums/ErrorType';
import { deleteUser } from 'models/user.model';

describe('Authentication API', () => {
  // Store a user ID for testing purposes
  let userId;

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/email-auth/sign-up')
      .send({ emailId: 'test@gmail.com', firstName: 'test', lastName: 'user' });

    expect(response.status).toBe(201);
    userId = response.body._id;
  });

  it('should throw an error when signing up with an existing username', async () => {
    const response = await request(app)
      .post('/email-auth/sign-up')
      .send({ emailId: 'test@gmail.com', firstName: 'test', lastName: 'user' });

    expect(response.status).toBe(400); // Expect a bad request status
    expect(response.body).toBe(UserErrorType.INVALID_EMAIL_ADDRESS);
  });

  it('should authenticate a user', async () => {
    const response = await request(app).post('/email-auth/login').send({ emailId: 'test@gmail.com' });

    expect(response.status).toBe(200);
  });

  it('should throw an error when logging in with incorrect credentials', async () => {
    const response = await request(app).post('/email-auth/login').send({ emailId: 'test_invalid@gmail.com' });

    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toBe(UserErrorType.INVALID_EMAIL_ADDRESS);
  });

  it('should log out a user', async () => {
    const response = await request(app).get('/email-auth/logout');

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await deleteUser(userId);
  });
});
