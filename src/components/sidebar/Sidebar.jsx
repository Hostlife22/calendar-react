import React, { useContext, useMemo } from 'react';
import AppContext from '../../context/contex';
import { getDateTime } from '../../utils/dateUtils';
import './sidebar.scss';

const Sidebar = () => {
  const { setModal, weekStartDate } = useContext(AppContext);
  const hadleClick = (hour) => {
    const defaultValue = {
      dateFrom: getDateTime(weekStartDate, `${hour}:00`),
      dateTo: getDateTime(weekStartDate, `${hour + 1}:00`),
    };
    setModal({
      visable: true,
      defaultValue,
    });
  };

  const hours = useMemo(() =>
    Array(24)
      .fill()
      .map((val, index) => index, [])
  );

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div className="time-slot" key={hour} onClick={() => hadleClick(hour)}>
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
