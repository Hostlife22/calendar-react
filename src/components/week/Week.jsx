import React, { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { dateFormater } from '../../utils/dateUtils';
import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, setFilterId }) => {
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

        //getting all events from the day we will render
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
          />
        );
      })}
    </div>
  );
};

export default Week;
