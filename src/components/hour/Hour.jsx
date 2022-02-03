import React, { useContext } from 'react';
import { formatMins, getEventDate } from '../../../src/utils/dateUtils.js';
import AppContext from '../../context/contex';
import Event from '../event/Event';

const Hour = ({ dataHour, hourEvents, dataDay, setFilterId }) => {
  const { setModal, weekStartDate } = useContext(AppContext);

  const handleClick = () => {
    const defaultValue = getEventDate(weekStartDate, dataHour, dataDay);
    setModal({
      visable: true,
      defaultValue,
    });
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={handleClick}
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            setFilterId={setFilterId}
          />
        );
      })}
    </div>
  );
};

export default Hour;
