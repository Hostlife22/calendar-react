import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/contex';
import { usePosition } from '../../hooks/useWindowDimensions';
import './event.scss';

const Event = ({
  height,
  marginTop,
  id,
  title,
  time,
  setFilterId,
  setDeletionError,
}) => {
  const { setPopup, setPopupPosition } = useContext(AppContext);
  const [position, setPosition] = usePosition();
  const eventStyle = { height, marginTop };

  useEffect(() => {
    setPopupPosition(position);
  }, [position]);

  const handleClickEvent = (e) => {
    setPosition(e.clientX, e.clientY, { width: 400, height: 200 });
    e.stopPropagation();
    setPopup((prev) => ({ ...prev, visable: true, style: position }));
    setDeletionError('');
    setFilterId(id);
  };

  return (
    <div style={eventStyle} className="event" onClick={handleClickEvent}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  setFilterId: PropTypes.func.isRequired,
  setDeletionError: PropTypes.func.isRequired,
};

Event.defaultProps = {
  id: '',
  title: '',
  time: '',
};

export default Event;
