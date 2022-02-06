import React, { useState } from 'react';
import { getWeekStartDate } from '../src/utils/dateUtils.js';
import './common.scss';
import Calendar from './components/calendar/Calendar.jsx';
import Header from './components/header/Header.jsx';
import AppContext from './context/contex.js';

const App = () => {
  const [modal, setModal] = useState({ visable: false, defaultValue: null });
  const [popup, setPopup] = useState({
    visable: false,
    dimensions: null,
    style: {},
  });
  const [popupPosition, setPopupPosition] = useState(null);
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
        popup,
        setPopup,
        popupPosition,
        setPopupPosition,
      }}
    >
      <Header />
      <Calendar />
    </AppContext.Provider>
  );
};

export default App;
