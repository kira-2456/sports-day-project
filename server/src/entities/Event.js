import _uniqueId from 'lodash/uniqueId';

class Event {
  constructor(eventName, eventCategory, startTime, endTime, status, capacity) {
    this._id = _uniqueId();

    this._eventName = eventName;
    this._eventCategory = eventCategory;

    this._startTime = startTime;
    this._endTime = endTime;

    this._status = status;

    this._capacity = capacity;
  }

  getId = () => this._id;

  getEventName = () => this._eventName;

  setEventName = eventName => {
    this._eventName = eventName;
  };

  getEventCategory = () => this._eventCategory;

  setEventCategory = eventCategory => {
    this._eventCategory = eventCategory;
  };

  getStartTime = () => this._startTime;

  setStartTime = startTime => {
    this._startTime = startTime;
  };

  getEndTime = () => this._endTime;

  setEndTime = endTime => {
    this._endTime = endTime;
  };

  getStatus = () => this._status;

  setStatus = status => {
    this._status = status;
  };

  getCapacity = () => this._capacity;

  setCapacity = capacity => {
    this._capacitys = capacity;
  };
}

export default Event;
