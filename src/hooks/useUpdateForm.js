import moment from 'moment';
import { useState } from 'react';
import { timeFormater } from '../utils/dateUtils';

export const useDefaultValue = () => {
  const [defaultValue, setDefaultValue] = useState({
    title: '',
    date: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  });

  const setDefaultVules = (data) => {
    setDefaultValue({
      title: data?.title ? data.title : 'No title',
      date: data?.date ? moment(data.date).format('YYYY-MM-DD') : '',
      dateFrom: data?.dateFrom ? timeFormater(data.dateFrom) : '',
      dateTo: data?.dateTo ? timeFormater(data.dateTo) : '',
      description: data?.description ? data.description : '',
    });
  };

  return [defaultValue, setDefaultVules];
};
