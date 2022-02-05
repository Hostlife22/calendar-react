import { useEffect, useState } from 'react';
import { getDateTime } from '../utils/dateUtils';

const isIntersection = ({ date, dateFrom, dateTo, events, filterId }) => {
  if (!date) {
    return null;
  }

  const eventFrom = getDateTime(date, dateFrom);
  const eventTo = getDateTime(date, dateTo);
  const intersection = events.find(
    (event) =>
      eventFrom < new Date(event.dateTo) && new Date(event.dateFrom) < eventTo
  );

  return intersection?.id === filterId ? !intersection : !!intersection;
};

export const useValidate = (errors, cb) => {
  const [errosDate, setErrosDate] = useState({
    date: '',
    duration: '',
    intersection: '',
  });
  const [duration, setDuration] = useState(null);
  const [isIntersections, setIsintersections] = useState(null);

  useEffect(() => {
    if (errors.date || errors.dateTo || errors.dateFrom) {
      const errorMessage = [errors.date, errors.dateFrom, errors.dateTo]
        .filter((error) => error !== undefined)
        .map((error) => error.message)
        .join(', ');

      setErrosDate((prev) => ({
        ...prev,
        date: `Введите ${errorMessage} события`,
      }));
    } else {
      setErrosDate((prev) => ({ ...prev, date: '' }));
    }
  }, [errors.date, errors.dateFrom, errors.dateTo]);

  useEffect(() => {
    if (cb) {
      const result = cb();

      if (result) {
        setDuration(result.timeFormat);
        setIsintersections(isIntersection(result));
      }
    }
  }, [cb]);

  useEffect(() => {
    if ((duration && duration < 0) || duration === 0) {
      setErrosDate((prev) => ({
        ...prev,
        duration: 'Событие должно заканчиваться в тот же день.',
      }));
    } else if (duration && duration > 6) {
      setErrosDate((prev) => ({
        ...prev,
        duration: 'Событие не должно длиться более 6 часов.',
      }));
    } else {
      setErrosDate((prev) => ({
        ...prev,
        duration: '',
      }));
    }
  }, [duration]);

  useEffect(() => {
    if (isIntersections) {
      setErrosDate((prev) => ({
        ...prev,
        intersection: ' Событие на это время уже есть.',
      }));
    } else {
      setErrosDate((prev) => ({
        ...prev,
        intersection: null,
      }));
    }
  }, [isIntersections]);

  return errosDate;
};
