import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/contex';
import { usePosition } from '../../hooks/useWindowDimensions';
import './event.scss';

const Event = ({ height, marginTop, id, title, time, setFilterId }) => {
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
    setFilterId(id);
  };

  return (
    <div style={eventStyle} className="event" onClick={handleClickEvent}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
