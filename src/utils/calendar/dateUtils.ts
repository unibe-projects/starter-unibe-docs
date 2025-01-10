export const isValidSelectedDate = (selectedDate: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};
