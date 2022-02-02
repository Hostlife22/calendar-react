import moment from 'moment';
import { useState } from 'react';

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
      title: data?.title ? data.title : '',
      date: data?.date ? moment(data.date).format('YYYY-MM-DD') : '',
      dateFrom: data?.dateFrom ? moment(data.dateFrom).format('hh:mm') : '',
      dateTo: data?.dateTo ? moment(data.dateTo).format('hh:mm') : '',
      description: data?.description ? data.description : '',
    });
  };

  return [defaultValue, setDefaultVules];
};
