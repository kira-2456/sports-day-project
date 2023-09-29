import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import eventReader from 'core/readers/eventReader';

import { registerEvent, unregisterEvent } from '../../services/eventsService';
import { fetchEvents, fetchEventsForUser } from '../../services/eventsService';
import { addEvent, removeEvent } from '../../ducks/events';
import EVENT_LIST_TYPES from '../../constants/eventListTypes';
import EventList from '../../components/EventsList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const onRegister = useCallback(item => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return dispatch(addEvent({ eventId: eventReader.id(item), type: EVENT_LIST_TYPES.USER }));
  }, []);

  const onUnregister = useCallback(item => {
    return dispatch(removeEvent({ eventId: eventReader.id(item), type: EVENT_LIST_TYPES.USER }));
  }, []);

  const allEventsActionProps = useMemo(
    () => ({
      actionColor: 'primary',
      actionLabel: 'Register',
      actionLoadingLabel: 'Registering...',
      onSuccess: onRegister,
      service: registerEvent,
    }),
    [onRegister]
  );

  const userEventsActionProps = useMemo(
    () => ({
      actionColor: 'secondary',
      actionLabel: 'Unregister',
      actionLoadingLabel: 'Unregistering...',
      onSuccess: onUnregister,
      service: unregisterEvent,
    }),
    [onRegister]
  );

  return (
    <div className={styles.appContainer}>
      <div className={styles.leftColumn}>
        <EventList
          id={EVENT_LIST_TYPES.ALL}
          type={EVENT_LIST_TYPES.ALL}
          service={fetchEvents}
          title={'All Events'}
          actionProps={allEventsActionProps}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.rightColumn}>
        <EventList
          id={EVENT_LIST_TYPES.USER}
          type={EVENT_LIST_TYPES.USER}
          service={fetchEventsForUser}
          title={'Selected Events'}
          actionProps={userEventsActionProps}
        />
      </div>
    </div>
  );
};

export default Dashboard;
