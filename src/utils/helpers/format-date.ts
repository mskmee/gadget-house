export const formatDateToDDMMYYYY = (date: string): string => {
  if (!date) return '';

  const [year, month, day] = date.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
};
