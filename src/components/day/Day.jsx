import React, { useMemo } from 'react';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({
  dataDay,
  dayEvents,
  setFilterId,
  currentTime,
  setDeletionError,
}) => {
  const hours = useMemo(
    () =>
      Array(24)
        .fill()
        .map((val, index) => index),
    []
  );

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            setFilterId={setFilterId}
            currentTime={currentTime}
            setDeletionError={setDeletionError}
          />
        );
      })}
    </div>
  );
};

export default Day;
