import PropTypes from 'prop-types';
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

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  setFilterId: PropTypes.func.isRequired,
  setDeletionError: PropTypes.func.isRequired,
};

Day.defaultProps = {
  currentTime: null,
};

export default Day;
