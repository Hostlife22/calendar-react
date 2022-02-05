import React, { useContext, useMemo, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import AppContext from '../../context/contex';
import Gateway from '../../gateway/Gateway';
import { generateWeekRange } from '../../utils/dateUtils';
import Modal from '../modal/Modal';
import Popup from '../popup/Popup';
import Sidebar from '../sidebar/Sidebar';
import Week from '../week/Week';
import Navigation from './../navigation/Navigation';
import './calendar.scss';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { popup, setPopup, modal, setModal, weekStartDate } =
    useContext(AppContext);
  const [filterId, setFilterId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Gateway.getEvents();
        const data = await response.json();
        setEvents((prev) => [...prev, ...data]);
      } catch (e) {
        alert('Ошибка при запросе данных :(');
        console.error(e);
      }
    }

    fetchData();
  }, []);

  const createEvent = async (event) => {
    try {
      if (filterId) {
        const filtredEvents = events.filter(({ id }) => id !== filterId);
        setEvents([...filtredEvents, { ...event, id: filterId }]);
        console.log(event, filterId);
        await Gateway.updateEventList(filterId, event);
        setFilterId(null);
      } else {
        setEvents((prev) => [...prev, event]);
        const response = await Gateway.createEvent(event);
        const data = await response.json();
        setEvents((prev) =>
          prev.map((item) => {
            if (item.id === event.id) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (e) {
      alert('Ошибка при создании события :(');
      console.error(e);
    }
  };

  const deleteEvent = async () => {
    try {
      if (events.length && filterId) {
        setEvents(events.filter(({ id }) => id !== filterId));
        setPopup((prev) => ({
          ...prev,
          visable: false,
          dimensions: null,
        }));

        const deleteId = filterId;

        setFilterId(null);
        await Gateway.deleteEvent(deleteId);
      }
    } catch (e) {
      alert('Ошибка при удаления события :(');
      console.error(e);
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

      {modal.visable && (
        <Modal createEvent={createEvent} events={events} filterId={filterId} />
      )}
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
