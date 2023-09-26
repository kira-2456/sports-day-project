import _uniqueId from 'lodash/uniqueId';

class Event {
  constructor({ eventName, eventCategory, startTime, endTime }) {
    this._id = _uniqueId();

    this.eventName = eventName;
    this.eventCategory = eventCategory;

    this.startTime = startTime;
    this.endTime = endTime;
  }

  getId = () => this._id;

  getEventName = () => this.eventName;

  setEventName = eventName => {
    this.eventName = eventName;
  };

  getEventCategory = () => this.eventCategory;

  setEventCategory = eventCategory => {
    this.eventCategory = eventCategory;
  };

  getStartTime = () => this.startTime;

  setStartTime = startTime => {
    this.startTime = startTime;
  };

  getEndTime = () => this.endTime;

  setEndTime = endTime => {
    this.endTime = endTime;
  };
}

export default Event;
