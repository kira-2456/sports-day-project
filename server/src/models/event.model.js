import _map from 'lodash/map';

import EventStatus from 'enums/EventStatus';
import { getFilteredData } from 'utils/filterUtils';

// Event Database
const Events = new Map();

/**
 * @param event: newly created event object
 * @type object
 * Desc: to add event in the events database
 */
const addEvent = event => {
  const eventId = event.getId();
  Events.set(eventId, event);
  return event;
};

/**
 * @param eventId: eventId to be cancelled
 * @type object
 * Desc: to cancel event in the events database
 */
const cancelEvent = eventId => {
  if (!Events.has(eventId)) {
    throw new Error(`invalid eventId : ${eventId}`);
  }

  const event = Events.get(eventId);
  event.setStatus(EventStatus.CANCELLED);
  return event;
};

/**
 * @param skip: number of events to skip
 * @param limit: size for pagination
 * @param filters
 * @type object
 * Desc: to get all events in pagination manner after applying filters
 */
const getAllEvents = (skip, limit, filters) => {
  const allEvents = _map(Array.from(Events), event => event[1]);

  const filteredEvents = getFilteredData({ data: allEvents, filters });
  const sortedEvents = filteredEvents.sort((eventA, eventB) => eventA.startTime - eventB.startTime);

  return sortedEvents.slice(skip, Math.min(skip + limit, sortedEvents.length));
};

module.exports = {
  Events,

  addEvent,
  cancelEvent,

  getAllEvents,
};
