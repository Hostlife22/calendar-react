import React, { useContext, useMemo, useState } from 'react';
import AppContext from '../../context/contex';
import eventsObj from '../../gateway/events';
import { generateWeekRange } from '../../utils/dateUtils';
import Modal from '../modal/Modal';
import Popup from '../popup/Popup';
import Sidebar from '../sidebar/Sidebar';
import Week from '../week/Week';
import Navigation from './../navigation/Navigation';
import './calendar.scss';

const Calendar = () => {
  const [events, setEvents] = useState(eventsObj);
  const { popup, setPopup, modal, setModal, weekStartDate } =
    useContext(AppContext);
  const [filterId, setFilterId] = useState(null);

  const createEvent = (event) => {
    if (filterId) {
      const filtredEvents = events.filter(({ id }) => id !== filterId);
      setEvents([...filtredEvents, event]);
      setFilterId(null);
    } else {
      setEvents((prev) => [...prev, event]);
    }
  };

  const deleteEvent = () => {
    if (events.length && filterId) {
      setEvents(events.filter(({ id }) => id !== filterId));
      setPopup((prev) => ({
        ...prev,
        visable: false,
        dimensions: null,
      }));
      setFilterId(null);
    }
  };

  const updateEvent = () => {
    if (events.length && filterId) {
      const updatedEvent = events.find(({ id }) => id === filterId);
      setPopup((prev) => ({
        ...prev,
        visable: false,
      }));
      setModal({
        visable: true,
        defaultValue: { ...updatedEvent, date: updatedEvent.dateTo },
      });
    }
  };

  const weekDates = useMemo(
    () => generateWeekRange(weekStartDate),
    [weekStartDate]
  );

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            setFilterId={setFilterId}
          />
        </div>
      </div>

      {modal.visable && <Modal createEvent={createEvent} />}
      {popup.visable && (
        <Popup
          setFilterId={setFilterId}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
          filterId={filterId}
          events={events}
        />
      )}
    </section>
  );
};

export default Calendar;
