import React, { useState } from 'react';
import { getWeekStartDate } from '../src/utils/dateUtils.js';
import './common.scss';
import Calendar from './components/calendar/Calendar.jsx';
import Header from './components/header/Header.jsx';
import AppContext from './context/contex.js';
import eventsObj from './gateway/events.js';

const App = () => {
  const [events, setEvents] = useState(eventsObj);
  const [modal, setModal] = useState({ visable: false, defaultValue: null });
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date())
  );

  return (
    <AppContext.Provider
      value={{
        modal,
        setModal,
        weekStartDate,
        setWeekStartDate,
        events,
        setEvents,
      }}
    >
      <Header />
      <Calendar />
    </AppContext.Provider>
  );
};

export default App;
