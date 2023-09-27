import _forEach from 'lodash/forEach';

import EventsFixtures from 'fixtures/events';
import UsersFixtures from 'fixtures/users';

import User from 'entities/User';
import Event from 'entities/Event';

import { addEvent } from 'models/event.model';
import { createUser } from 'models/user.model';

const initializeData = async () => {
  _forEach(EventsFixtures, async event => {
    await addEvent(new Event(event));
  });

  _forEach(UsersFixtures, async user => {
    await createUser(new User(user));
  });
};

export default initializeData;
