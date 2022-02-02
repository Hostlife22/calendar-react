import React, { useContext } from 'react';
import AppContext from '../../context/contex.js';
import { useCurrentDate } from '../../hooks/useCurrentDate.js';
import './header.scss';

const Header = () => {
  const { setModal, setWeekStartDate } = useContext(AppContext);
  const { currentMonday, currentMonth, setNextWeek, setPrevWeek } =
    useCurrentDate();

  return (
    <>
      <header className="header">
        <button
          className="button create-event-btn"
          onClick={() => setModal({ visable: true, defaultValue: null })}
        >
          <i className="fas fa-plus create-event-btn__icon"></i>Create
        </button>
        <div className="navigation">
          <button
            className="navigation__today-btn button"
            onClick={() => setWeekStartDate(currentMonday)}
          >
            Today
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={setPrevWeek}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={setNextWeek}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <span className="navigation__displayed-month">{currentMonth}</span>
        </div>
      </header>
    </>
  );
};

export default Header;
