import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { dateFormater } from '../../utils/dateUtils';
import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, setFilterId, setDeletionError }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalId = useRef();

  useEffect(() => {
    const isCurrentWeek = weekDates.find(
      (date) => dateFormater(date) === dateFormater(new Date())
    );

    if (isCurrentWeek) {
      setCurrentTime(new Date());

      intervalId.current = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
    } else {
      intervalId.current = null;
      setCurrentTime(null);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [weekDates]);

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = !events.length
          ? []
          : events
              .map((event) => ({
                ...event,
                dateFrom: new Date(event.dateFrom),
                dateTo: new Date(event.dateTo),
              }))
              .filter(
                (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
              );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setFilterId={setFilterId}
            currentTime={currentTime}
            setDeletionError={setDeletionError}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  setFilterId: PropTypes.func.isRequired,
  setDeletionError: PropTypes.func.isRequired,
};

export default Week;
