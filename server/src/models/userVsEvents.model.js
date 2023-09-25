import _map from 'lodash/map';
import _every from 'lodash/every';
import _pull from 'lodash/pull';
import _includes from 'lodash/includes';

import { getFilteredData } from 'utils/filterUtils';
import { isEventAvailable } from 'utils/availabilityUtils';

import { validateUser } from './user.model';
import { Events, validateEvent } from './event.model';

// UserVsEvent Database
const UserVsEventIds = new Map();

const USER_EVENT_LIMIT = 3;

const registerEvent = async (userId, eventId) => {
  await validateUser(userId);
  const event = await validateEvent(eventId);

  const upcomingEventsForUser = _map(UserVsEventIds.get(userId) || [], eventId => Events.get(eventId));

  // check for limit
  if (upcomingEventsForUser.length === USER_EVENT_LIMIT) {
    throw new Error('user has maxed out their limit for events');
  }

  // check availability of the event
  const isEventAvailableForUser = _every(upcomingEventsForUser, scheduledEvent => {
    return isEventAvailable({
      eventStartTime: scheduledEvent.getStartTime(),
      eventEndTime: scheduledEvent.getEndTime(),

      startTime: event.getStartTime(),
      endTime: event.getEndTime(),
    });
  });

  if (!isEventAvailableForUser) {
    throw new Error(`event ${eventId} is not possible for user ${userId}`);
  }

  UserVsEventIds.set(userId, [...upcomingEventsForUser, eventId]);
};

const unregisterEvent = async (userId, eventId) => {
  await validateUser(userId);
  await validateEvent(eventId);

  const upcomingEventIdsForUser = UserVsEventIds.get(userId);
  const isUserRegisteredForEvent = _includes(upcomingEventIdsForUser, eventId);

  // check if the user is registered to this event
  if (!isUserRegisteredForEvent) {
    throw new Error('user has not register for this event');
  }

  UserVsEventIds.set(userId, _pull(upcomingEventIdsForUser, eventId));
};

/**
 * @param userId: userId for which events are fetched
 * @param skip: number of events to skip
 * @param limit: size for pagination
 * @param filters
 * @type object
 * Desc: to get all events in pagination manner after applying filters
 */
const getAllUserRegisteredEvents = async (userId, skip, limit, filters) => {
  await validateUser(userId);
  const upcomingEventsForUser = _map(UserVsEventIds.get(userId) || [], eventId => Events.get(eventId));

  const filteredEvents = getFilteredData({ data: upcomingEventsForUser, filters });
  const sortedEvents = filteredEvents.sort((eventA, eventB) => eventA.startTime - eventB.startTime);

  return sortedEvents.slice(skip, Math.min(skip + limit, sortedEvents.length));
};

exports = {
  registerEvent,
  unregisterEvent,

  getAllUserRegisteredEvents,
};
