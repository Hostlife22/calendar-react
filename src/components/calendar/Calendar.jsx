import React, { useContext, useMemo } from 'react';
import AppContext from '../../context/contex';
import { generateWeekRange } from '../../utils/dateUtils';
import Modal from '../modal/Modal';
import Sidebar from '../sidebar/Sidebar';
import Week from '../week/Week';
import Navigation from './../navigation/Navigation';
import './calendar.scss';

const Calendar = () => {
  const { modal, weekStartDate, events } = useContext(AppContext);
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
          <Week weekDates={weekDates} events={events} />
        </div>
      </div>

      {modal.visable && <Modal />}
    </section>
  );
};

export default Calendar;
