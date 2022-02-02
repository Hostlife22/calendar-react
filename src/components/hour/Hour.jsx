import React, { useContext } from 'react';
import { formatMins } from '../../../src/utils/dateUtils.js';
import AppContext from '../../context/contex';
import Event from '../event/Event';

const Hour = ({ dataHour, hourEvents }) => {
  const { setModal } = useContext(AppContext);

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={() =>
        setModal({
          visable: true,
          defaultValue: null,
        })
      }
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
          />
        );
      })}
    </div>
  );
};

export default Hour;
