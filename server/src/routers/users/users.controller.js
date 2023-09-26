import to from 'utils/await-to';
import { registerEvent, unregisterEvent, getAllUserRegisteredEvents } from 'models/userEventIdMapping.model';

const getRegisteredEvents = (req, res) => {
  const { id: userId } = req.user;
  const { skip, limit, filters } = req.body;

  const paginatedEvents = getAllUserRegisteredEvents(userId, skip, limit, filters);

  return res.json(paginatedEvents);
};

const unregister = async (req, res) => {
  const { id: userId } = req.user;
  const { eventId } = req.body;

  const [, error] = await to(unregisterEvent(userId, eventId));

  if (error) {
    res.send(400).json(error.message);
  }

  res.json(eventId);
};

const register = async (req, res) => {
  const { id: userId } = req.user;
  const { eventId } = req.body;

  const [, error] = await to(registerEvent(userId, eventId));

  if (error) {
    res.send(400).json(error.message);
  }

  res.json(eventId);
};

export { register as registerEvent, unregister as unregisterEvent, getRegisteredEvents };
