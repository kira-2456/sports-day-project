import { getAllEvents } from 'models/event.model';

const getEvents = (req, res) => {
  const { skip, limit, filters } = req.body;

  const paginatedEvents = getAllEvents(skip, limit, filters);

  return res.json(paginatedEvents);
};

export { getEvents as getRegisteredEvents };
