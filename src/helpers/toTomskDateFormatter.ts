export const formatDateTomsk = (date?: Date) => {
  const preparedDate = new Date(date?.getTime() || Date.now())
  const TOMSK_TIMEZONE_OFFSET = 7
  preparedDate.setHours(preparedDate.getHours() + TOMSK_TIMEZONE_OFFSET)
  const day = preparedDate.getDate();
  const month = preparedDate.getMonth() + 1;
  const year = preparedDate.getFullYear();
  const hour = preparedDate.getHours();
  const minute = preparedDate.getMinutes();

  return `${day}.${month}.${year} ${hour}:${minute} (Томск)`;
}