import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { format } from 'date-fns';

import { useLazyFetch } from 'core/utils/hooks';
import eventReader from 'core/readers/eventReader';
import DateFormats from 'core/constants/dateFormats';
import { hideAlertBox, showAlertBox } from 'molecules/AlertBox';

import styles from './EventCard.module.css';

const EventCard = ({
  item,
  columnWidth,
  actionLabel,
  service,
  onSuccess,
  actionColor = 'primary',
  actionLoadingLabel,
}) => {
  const eventId = eventReader.id(item);
  const eventName = eventReader.eventName(item);
  const eventCategory = eventReader.eventCategory(item);

  const startTime = eventReader.startTime(item);
  const endTime = eventReader.endTime(item);

  const formattedStartTime = format(startTime, DateFormats.HOUR_MINUTE_AM_PM);
  const formattedEndTime = format(endTime, DateFormats.HOUR_MINUTE_AM_PM);

  const onAdaptedSuccess = useCallback(() => onSuccess?.(item), [item, onSuccess]);

  const onFailure = useCallback(
    error => {
      showAlertBox({
        title: `${actionLabel} Failed`,
        description: error?.error || 'Please try again later!',
        actions: [
          {
            label: 'Ok',
            color: 'primary',
            onPress: hideAlertBox,
          },
        ],
      });
    },
    [actionLabel]
  );

  const { loading, fetch } = useLazyFetch({
    fetchData: service,
    onSuccess: onAdaptedSuccess,
    onFailure: onFailure,
  });

  const onActionPress = useCallback(() => fetch?.({ eventId }), [fetch, eventId]);

  return (
    <Card elevation={3} style={{ width: `${columnWidth}px`, marginBottom: '16px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          {eventName}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {eventCategory}
        </Typography>
        <Typography variant="body2" className={styles.dateRange}>
          {`${formattedStartTime} - ${formattedEndTime}`}
        </Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button onClick={onActionPress} variant="contained" color={actionColor}>
          {loading ? actionLoadingLabel : actionLabel}
        </Button>
      </div>
    </Card>
  );
};

export default EventCard;
