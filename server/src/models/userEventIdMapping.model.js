import _map from 'lodash/map';
import _every from 'lodash/every';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';
import _includes from 'lodash/includes';

import { ErrorType } from 'enums/ErrorType';
import { getFilteredData } from 'utils/filterUtils';
import { isEventAvailable } from 'utils/availabilityUtils';

import Events, { validateEvent } from './event.model';

// UserVsEvent Database
const UserEventIdMapping = new Map();

const USER_EVENT_LIMIT = 3;
const REGISTRATION_THRESHOLD_TIME_LIMIT = 15 * 60 * 1000; // 15 minutes in ms

/**
 * @param userId
 * @param eventId
 * @type object
 * Desc: to register event for the user
 */
const registerEvent = async (userId, eventId) => {
  const event = await validateEvent(eventId);
  const currentTime = Date.now();

  const upcomingEventsForUser = _reduce(
    UserEventIdMapping.get(userId) || [],
    (acc, eventId) => {
      const event = Events.get(eventId);

      if (event.getStartTime() > currentTime) {
        return [...acc, event];
      }

      return acc;
    },
    []
  );

  // check for limit
  if (upcomingEventsForUser.length === USER_EVENT_LIMIT) {
    throw new Error(ErrorType.USER_EXCEEDS_EVENT_LIMIT);
  }

  if (event.getStartTime() - REGISTRATION_THRESHOLD_TIME_LIMIT < currentTime) {
    throw new Error(ErrorType.EVENT_REGISTRATION_CLOSED);
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
    throw new Error(ErrorType.COINCIDING_EVENTS);
  }

  UserEventIdMapping.set(userId, [...upcomingEventsForUser, eventId]);
};

/**
 * @param userId
 * @param eventId
 * @type object
 * Desc: to unregister event for the user
 */
const unregisterEvent = async (userId, eventId) => {
  const event = await validateEvent(eventId);

  const upcomingEventIdsForUser = UserEventIdMapping.get(userId);
  const isUserRegisteredForEvent = _includes(upcomingEventIdsForUser, eventId);

  // check if the user is registered to this event
  if (!isUserRegisteredForEvent) {
    throw new Error(ErrorType.INVALID_EVENT);
  }

  if (event.getStartTime() < Date.now()) {
    throw new Error(ErrorType.EVENT_UN_REGISTRATION_CLOSED);
  }

  UserEventIdMapping.set(
    userId,
    _filter(upcomingEventIdsForUser, id => id !== eventId)
  );
};

/**
 * @param userId: userId for which events are fetched
 * @param skip: number of events to skip
 * @param limit: size for pagination
 * @param filters
 * @type object
 * Desc: to get all events in pagination manner after applying filters
 */
const getAllUserRegisteredEvents = (userId, skip, limit, filters) =>
  new Promise(res => {
    const upcomingEventsForUser = _map(UserEventIdMapping.get(userId) || [], eventId => Events.get(eventId));

    const filteredEvents = getFilteredData({ data: upcomingEventsForUser, filters });
    const sortedEvents = filteredEvents.sort((eventA, eventB) => eventA.startTime - eventB.startTime);
    const slicedEvents = sortedEvents.slice(skip, Math.min(skip + limit, sortedEvents.length));

    res({
      events: slicedEvents,
      hasMore: skip + limit < sortedEvents.length,
    });
  });

export default UserEventIdMapping;

export { registerEvent, unregisterEvent, getAllUserRegisteredEvents };
