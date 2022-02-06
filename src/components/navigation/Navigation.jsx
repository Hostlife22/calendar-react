import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { dateFormater, days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const isCurrentWeek = weekDates.find(
    (date) => dateFormater(date) === dateFormater(new Date())
  );

  const setCurrentDay = useMemo(() => {
    if (isCurrentWeek) {
      return isCurrentWeek.getDate();
    }
  }, [isCurrentWeek]);

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        return (
          <div
            key={dayDate.getTime()}
            className="calendar__day-label day-label"
          >
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span
              className={`day-label__day-number ${
                setCurrentDay && setCurrentDay === dayDate.getDate()
                  ? 'day-label__day-number_active'
                  : ''
              }`}
            >
              {dayDate.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
