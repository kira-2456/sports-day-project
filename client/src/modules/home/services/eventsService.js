import AppController from 'core/controllers/AppController';
import { waitTime } from 'core/utils/general';
import to from 'core/utils/await-to';

const DEFAULT_FILTERS = [{ field: 'startTime', values: [Date.now()], filterType: 'GT' }];
export const fetchEvents = async ({ page: pageNumber, filters = DEFAULT_FILTERS } = EMPTY_OBJECT) => {
  const { page, size } = pageNumber;
  const response = await AppController.getApiClient().post('/api/events/', { skip: page * size, limit: size, filters });

  await waitTime(2000);
  return response;
};

export const fetchEventsForUser = async ({ page: pageNumber, filters = DEFAULT_FILTERS } = EMPTY_OBJECT) => {
  const { page, size } = pageNumber;
  const response = await AppController.getApiClient().post('/api/users/events/', {
    skip: page * size,
    limit: size,
    filters,
  });

  await waitTime(2000);
  return response;
};

export const registerEvent = async ({ eventId } = EMPTY_OBJECT) => {
  const response = await AppController.getApiClient().post('/api/users/registerEvent', { eventId });

  await waitTime(2000);
  return response;
};

export const unregisterEvent = async ({ eventId } = EMPTY_OBJECT) => {
  const response = await AppController.getApiClient().post('/api/users/unregisterEvent', { eventId });

  await waitTime(2000);
  return response;
};
