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
          <svg width="30" height="30" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
          Create
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
