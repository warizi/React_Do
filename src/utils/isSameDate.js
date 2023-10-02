

export const isSameDate = (date) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const anotherDate = new Date(date);
  const anotherYear = anotherDate.getFullYear();
  const anotherMonth = anotherDate.getMonth() + 1;
  const anotherDay = anotherDate.getDate();
  if(year === anotherYear && month === anotherMonth && day === anotherDay) return true;
  return false;
}
