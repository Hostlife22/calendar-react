import moment from 'moment';
import { useContext } from 'react';
import AppContext from '../context/contex';
import { getDisplayedMonth, getWeekStartDate } from '../utils/dateUtils';

export const useCurrentDate = () => {
  const { weekStartDate, setWeekStartDate } = useContext(AppContext);
  const currentMonday = getWeekStartDate(new Date());
  const currentMonth = getDisplayedMonth(weekStartDate);

  const setNextWeek = () => {
    const dayOfWeek = moment(weekStartDate).add(7, 'days').format();
    setWeekStartDate(new Date(dayOfWeek));
  };

  const setPrevWeek = () => {
    const dayOfWeek = moment(weekStartDate).subtract(7, 'days').format();
    setWeekStartDate(new Date(dayOfWeek));
  };

  return { currentMonday, currentMonth, setNextWeek, setPrevWeek };
};
