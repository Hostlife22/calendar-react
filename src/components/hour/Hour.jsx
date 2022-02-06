import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { formatMins, getEventDate } from '../../../src/utils/dateUtils.js';
import AppContext from '../../context/contex';
import Event from '../event/Event';
import LineTime from '../lineTime/LineTime.jsx';

const Hour = ({
  dataHour,
  hourEvents,
  dataDay,
  setFilterId,
  currentTime,
  setDeletionError,
}) => {
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
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            setFilterId={setFilterId}
            setDeletionError={setDeletionError}
          />
        );
      })}
      {currentTime &&
      dataDay === currentTime.getDate() &&
      dataHour === currentTime.getHours() ? (
        <LineTime styleTop={currentTime.getMinutes()} />
      ) : null}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  setFilterId: PropTypes.func.isRequired,
  setDeletionError: PropTypes.func.isRequired,
};

Hour.defaultProps = {
  currentTime: null,
};

export default Hour;
