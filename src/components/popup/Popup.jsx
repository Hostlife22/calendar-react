import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/contex';
import { timeFormater } from '../../utils/dateUtils';
import './popup.scss';

const Popup = ({
  setFilterId,
  filterId,
  deleteEvent,
  updateEvent,
  events,
  deletionError,
}) => {
  const { setPopup, setPopupPosition, popupPosition } = useContext(AppContext);
  const [position, setPosition] = useState(null);
  const [popupText, setPopupText] = useState({
    title: '',
    date: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  });

  useEffect(() => {
    if (popupPosition) {
      setPosition(popupPosition);
    }
  }, [popupPosition]);

  useEffect(() => {
    if (filterId) {
      setPopupText(events.find(({ id }) => id === filterId));
    }
  }, [filterId]);

  const onClosePopup = () => {
    setPopup((prev) => ({
      ...prev,
      visable: false,
      dimensions: null,
    }));
    setPopupPosition(null);
    setFilterId('');
  };

  return (
    <div className="popup hidden overlay" onClick={onClosePopup}>
      <div
        className="popup__content"
        style={position}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup__buttons">
          <button className="popup__btn update-btn" onClick={updateEvent}>
            <i className="fas fa-pen"></i>
          </button>
          <button className="popup__btn delete-btn" onClick={deleteEvent}>
            <i className="fas fa-trash"></i>
          </button>
          <button className="popup__btn close-btn" onClick={onClosePopup}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="popup__description">
          <p className="popup__title">{popupText.title}</p>
          <p className="popup__event">{`From ${timeFormater(
            popupText.dateFrom
          )} to ${timeFormater(popupText.dateTo)}`}</p>
          <p className="popup__text">{popupText.description}</p>
          <p className="event-form__error">{deletionError && deletionError}</p>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  setFilterId: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

Popup.defaultProps = {
  filterId: '',
  deletionError: '',
};

export default Popup;
