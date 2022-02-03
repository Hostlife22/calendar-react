import momemt from 'moment';

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDisplayedMonth = (date) => {
  const weekStart = getWeekStartDate(date);
  const weekEnd = new Date(momemt(date).add(6, 'days').format());
  const startMonth = weekStart.getMonth();
  const startYear = weekStart.getFullYear();
  const endMonth = weekEnd.getMonth();
  const endYear = weekEnd.getFullYear();
  const isSameMonth = startMonth === endMonth;
  if (isSameMonth) {
    return `${months[startMonth]} ${startYear}`;
  }
  const isSameYear = startYear === endYear;
  return isSameYear
    ? `${months[startMonth]} - ${months[endMonth]} ${startYear}`
    : `${months[startMonth]} ${startYear} - ${months[endMonth]} ${endYear}`;
};

export const getEventDate = (weekStartDate, dataHour, dataDay) => {
  const differenceDate = dataDay - new Date(weekStartDate).getDate();
  const date = momemt(weekStartDate)
    .add(differenceDate >= 0 ? differenceDate : dataDay, 'days')
    .format('YYYY-MM-DD');

  const dateFrom = momemt(date).set('hour', dataHour).format();
  const dateTo = momemt(date)
    .set('hour', dataHour + 1)
    .format();

  return { date, dateFrom, dateTo };
};

export const timeFormater = (data) => {
  return momemt(data).format('HH:mm');
};
