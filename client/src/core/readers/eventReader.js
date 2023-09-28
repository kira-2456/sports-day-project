import _property from 'lodash/property';

const eventReader = {
  id: _property('id'),

  eventName: _property('eventName'),
  eventCategory: _property('eventCategory'),

  startTime: _property('startTime'),
  endTime: _property('endTime'),
  duration: event => {
    return eventReader.endTime(event) + eventReader.startTime(event);
  },
};

export default eventReader;
