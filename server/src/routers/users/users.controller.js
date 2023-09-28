import to from 'utils/await-to';
import { validateUser } from 'models/user.model';
import { registerEvent, unregisterEvent, getAllUserRegisteredEvents } from 'models/userEventIdMapping.model';

const getUser = async (req, res) => {
  const { id: userId } = req.user;

  const [user, error] = await to(validateUser(userId));

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ user });
};

const getRegisteredEvents = async (req, res) => {
  const { id: userId } = req.user;
  const { skip, limit, filters } = req.body;

  const { events, hasMore } = await getAllUserRegisteredEvents(userId, skip, limit, filters);

  return res.json({ events, hasMore });
};

const unregister = async (req, res) => {
  const { id: userId } = req.user;
  const { eventId } = req.body;

  const [, error] = await to(unregisterEvent(userId, eventId));

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ eventId });
};

const register = async (req, res) => {
  const { id: userId } = req.user;
  const { eventId } = req.body;

  const [, error] = await to(registerEvent(userId, eventId));

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ eventId });
};

export { register as registerEvent, unregister as unregisterEvent, getRegisteredEvents, getUser };
