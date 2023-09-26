import { ErrorType } from 'enums/ErrorType';
import Database from 'entities/Database';
import { getFilteredData } from 'utils/filterUtils';

// Event Database
const Events = new Database();

/**
 * @param eventId: eventId to be validated
 * @type object
 * Desc: validate event
 */
const validateEvent = eventId =>
  new Promise((res, rej) => {
    if (Events.has(eventId)) {
      res(Events.get(eventId));
    }

    rej(new Error(ErrorType.INVALID_EVENT));
  });

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
 * Desc: to delete event from the events database
 */
const deleteEvent = eventId => {
  if (!Events.has(eventId)) {
    throw new Error(ErrorType.INVALID_EVENT);
  }

  const event = Events.get(eventId);
  Events.delete(eventId);
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
  const allEvents = Events.values();

  const filteredEvents = getFilteredData({ data: allEvents, filters });
  const sortedEvents = filteredEvents.sort((eventA, eventB) => eventA.startTime - eventB.startTime);

  return sortedEvents.slice(skip, Math.min(skip + limit, sortedEvents.length));
};

export default Events;

export { addEvent, deleteEvent, getAllEvents, validateEvent };
