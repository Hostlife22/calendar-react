import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AppContext from '../../context/contex';
import Gateway from '../../gateway/Gateway';
import { generateWeekRange, isDeletionAllowed } from '../../utils/dateUtils';
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
  const [filterId, setFilterId] = useState('');
  const [deletionError, setDeletionError] = useState('');

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
        await Gateway.updateEventList(filterId, event);
        setFilterId('');
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
        setFilterId(data.id);
      }
    } catch (e) {
      alert('Ошибка при создании события :(');
      console.error(e);
    }
  };

  const deleteEvent = async () => {
    try {
      if (events.length && filterId) {
        const [isDeletion, time] = isDeletionAllowed(events, filterId);

        if (isDeletion) {
          setDeletionError(`Удалять событие нельзя, ${time} до начала`);
          return;
        }

        setEvents(events.filter(({ id }) => id !== filterId));
        setPopup((prev) => ({
          ...prev,
          visable: false,
          dimensions: null,
        }));

        const deleteId = filterId;

        setFilterId('');
        await Gateway.deleteEvent(deleteId);
      }
    } catch (e) {
      alert('Ошибка при удаления события :(');
      console.error(e);
    }
  };

  const updateEvent = () => {
    if (events.length && filterId) {
      const [isDeletion, time] = isDeletionAllowed(events, filterId);

      if (isDeletion) {
        setDeletionError(`Редактировать нельзя, ${time} до начала`);
        return;
      }

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
            setDeletionError={setDeletionError}
          />
        </div>
      </div>

      <CSSTransition
        in={modal.visable}
        timeout={200}
        classNames="my-node"
        unmountOnExit
      >
        <Modal createEvent={createEvent} events={events} filterId={filterId} />
      </CSSTransition>

      <CSSTransition
        in={popup.visable}
        timeout={200}
        classNames="my-node"
        unmountOnExit
      >
        <Popup
          setFilterId={setFilterId}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
          filterId={filterId}
          events={events}
          deletionError={deletionError}
        />
      </CSSTransition>
    </section>
  );
};

export default Calendar;
