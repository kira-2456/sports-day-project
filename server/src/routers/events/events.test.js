import request from 'supertest';

import app from 'app';
import { deleteUser } from 'models/user.model';
import initializeData from 'utils/initializeData';

describe('Events API', () => {
  // Store a user ID for testing purposes
  let userId;
  let token;

  beforeAll(async () => {
    await initializeData();

    const response = await request(app)
      .post('/email-auth/sign-up')
      .send({ emailId: 'test@gmail.com', firstName: 'test', lastName: 'user' });

    userId = response.body.user.id;
    token = response.headers?.['set-cookie']?.[0].split(';')?.[0];
  });

  it('fetch events', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({ skip: 0, limit: 1, filters: [{ filterType: 'GT', field: 'startTime', values: [0] }] })
      .set('Cookie', [token]);

    expect(response.status).toBe(200);
  });

  it('fetch events with wrong payload', async () => {
    const response = await request(app)
      .get('/api/events')
      .send({ skip: 0, filters: [{ filterType: 'GT', field: 'startTime', values: [0] }] })
      .set('Cookie', [token]);

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await deleteUser(userId);
  });
});
