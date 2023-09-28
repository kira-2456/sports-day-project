import request from 'supertest';

import app from 'app';
import { ErrorType } from 'enums/ErrorType';
import { deleteUser } from 'models/user.model';
import initializeData from 'utils/initializeData';
import Events from 'models/event.model';

describe('Users API', () => {
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

  it('fetch user registered events', async () => {
    const response = await request(app)
      .post('/api/users/events')
      .send({ userId, skip: 0, limit: 1, filters: [{ filterType: 'GT', field: 'startTime', values: [0] }] })
      .set('Cookie', [token]);

    expect(response.status).toBe(200);
  });

  it('fetch events with wrong payload', async () => {
    const response = await request(app)
      .post('/api/users/events')
      .send({ userId, skip: 0, filters: [{ filterType: 'GT', field: 'startTime', values: [0] }] })
      .set('Cookie', [token]);

    expect(response.status).toBe(400);
  });

  it('register for a valid event', async () => {
    const response = await request(app)
      .post('/api/users/registerEvent')
      .send({ eventId: Events.values()?.[0]?.getId() })
      .set('Cookie', [token]);

    expect(response.status).toBe(200);
  });

  it('register for an invalid event', async () => {
    const response = await request(app)
      .post('/api/users/registerEvent')
      .send({ eventId: 'asd' })
      .set('Cookie', [token]);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(ErrorType.INVALID_EVENT);
  });

  it('coinciding events', async () => {
    const response = await request(app)
      .post('/api/users/registerEvent')
      .send({ eventId: Events.values()?.[0]?.getId() })
      .set('Cookie', [token]);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(ErrorType.COINCIDING_EVENTS);
  });

  // it('register for an event after registration is closed', async () => {
  //   const response = await request(app)
  //     .post('/api/users/registerEvent')
  //     .send({ eventId: Events.values()?.[1]?.getId() })
  //     .set('Cookie', [token]);
  //
  //   expect(response.status).toBe(400);
  //   expect(response.body).toBe(ErrorType.EVENT_REGISTRATION_CLOSED);
  // });

  it("unregister for an event which the user hasn't registered", async () => {
    const response = await request(app)
      .post('/api/users/unregisterEvent')
      .send({ eventId: Events.values()?.[4]?.getId() })
      .set('Cookie', [token]);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(ErrorType.INVALID_EVENT);
  });

  afterAll(async () => {
    await deleteUser(userId);
  });
});
