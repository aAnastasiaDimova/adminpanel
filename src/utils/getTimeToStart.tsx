export const getTimeToStart = (targetDate: string): string => {
  if (!targetDate) return "";

  const target = new Date(targetDate);
  const now = new Date();

  if (isNaN(target.getTime())) return "";
  const difference = target.getTime() - now.getTime();
  if (difference <= 0) return "Событие началось";
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
};
