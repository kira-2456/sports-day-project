import { useCallback, useEffect, useMemo } from 'react';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';

import EmptyView from 'molecules/EmptyView';
import eventReader from 'core/readers/eventReader';
import LoadingPlaceholder from 'molecules/LoadingPlaceholder';
import { REQUEST_TYPE } from 'core/constants/requestConstants';

import { eventStateKey, fetchEvents as fetchEventsAction } from '../../ducks/events';
import MasonryList from '../MasonryList';
import EventCard from '../EventCard';
import styles from './EventsList.module.css';

const EventsList = ({ id, type, service, title, actionProps = EMPTY_OBJECT }) => {
  const dispatch = useDispatch();

  const data = useSelector(state => _get(state, [...eventStateKey, type, 'data'], EMPTY_OBJECT));
  const meta = useSelector(state => _get(state, [...eventStateKey, type, 'meta'], EMPTY_OBJECT));
  const eventsMap = useSelector(state => _get(state, [...eventStateKey, 'map'], EMPTY_OBJECT));

  const adaptedData = useMemo(
    () => _reduce(data, (acc, eventId) => [...acc, eventsMap?.[eventId]], []),
    [data, eventsMap]
  );
  const { isLoading = true, isFailed, isLoadingMore, hasMore } = meta || EMPTY_OBJECT;

  const fetchEvents = useCallback(
    ({ requestType = REQUEST_TYPE.FETCH } = EMPTY_OBJECT) => {
      dispatch(
        fetchEventsAction({
          type,
          service,
          requestType,
        })
      );
    },
    [dispatch, type, service]
  );

  const fetchMore = useCallback(() => {
    return fetchEvents({ requestType: REQUEST_TYPE.LOAD_MORE });
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <div className={styles.title}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      </div>
    );
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '16px' }}>
        {hasMore && (
          <Button variant="contained" color="primary" onClick={fetchMore} disabled={isLoadingMore}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </div>
    );
  }, [hasMore, fetchMore, isLoadingMore]);

  const renderItem = useCallback(
    ({ item, columnWidth }) => <EventCard item={item} columnWidth={columnWidth} {...actionProps} />,
    [actionProps]
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (isFailed) {
    return (
      <div className={styles.emptyContainer}>
        {renderHeader()}
        <EmptyView title={'Unexpected error occurred!'} description={'Oops! we could not load events'} />
      </div>
    );
  }

  if (_isEmpty(data)) {
    return (
      <div className={styles.emptyContainer}>
        {renderHeader()}
        <EmptyView title={'No events'} className={styles.emptyList} />
      </div>
    );
  }

  return (
    <MasonryList
      id={id}
      keyExtractor={eventReader.id}
      items={adaptedData}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      renderItem={renderItem}
      minColumnWidth={300}
      maxColumns={2}
      gutterWidth={16}
    />
  );
};

export default EventsList;
