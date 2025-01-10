// utils/eventUtils.ts
import { Event } from '../../interface/calendar/calendare.interface';
import { formatTime, parseTime } from './timeUtils';

export const createEvent = (selectedDate: Date, workingHours: { start: string, end: string }): Event | null => {
  if (!selectedDate || !workingHours.start || !workingHours.end) return null;

  const startDate = new Date(selectedDate);
  const endDate = new Date(selectedDate);

  const [startHour, startMinute] = parseTime(workingHours.start);
  const [endHour, endMinute] = parseTime(workingHours.end);

  startDate.setHours(startHour, startMinute, 0);
  endDate.setHours(endHour, endMinute, 0);

  return {
    title: 'Atención al paciente',
    start: startDate,
    end: endDate,
    allDay: false,
  };
};
