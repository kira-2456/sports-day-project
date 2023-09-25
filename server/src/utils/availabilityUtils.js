export const isEventAvailable = ({ eventStartTime, eventEndTime, startTime, endTime }) => {
  return startTime > eventEndTime || endTime < eventStartTime;
};
