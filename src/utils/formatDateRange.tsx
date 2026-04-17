export const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "";

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];

  if (startDate.getMonth() === endDate.getMonth()) {
    return `с ${startDay} по ${endDay} ${endMonth}`;
  } else {
    const startMonth = months[startDate.getMonth()];
    return `с ${startDay} ${startMonth} по ${endDay} ${endMonth}`;
  }
};
