import { getAllEvents } from 'models/event.model';

const getEvents = async (req, res) => {
  const { skip, limit, filters } = req.body;

  const paginatedEvents = await getAllEvents(skip, limit, filters);

  return res.json(paginatedEvents);
};

export { getEvents as getRegisteredEvents };
