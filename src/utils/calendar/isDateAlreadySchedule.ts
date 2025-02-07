export const isDateAlreadyScheduled = (
  date: string,
  scheduleData: any,
): 'working' | 'non-working' | 'unknown' => {
  const scheduleDay = scheduleData?.listScheduleDays?.items.find(
    (scheduleDay: any) => scheduleDay.date === date,
  );

  if (!scheduleDay) {
    return 'unknown';
  }

  return scheduleDay.is_working_day ? 'working' : 'non-working';
};
