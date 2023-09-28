import { getAllEvents } from 'models/event.model';

const getEvents = async (req, res) => {
  const { skip, limit, filters } = req.body;

  const { events, hasMore } = await getAllEvents(skip, limit, filters);

  return res.json({ events, hasMore });
};

export { getEvents as getRegisteredEvents };
