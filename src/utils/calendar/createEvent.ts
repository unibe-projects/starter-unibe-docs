// utils/calendar/createEvent.ts
import { Event } from '../../interface/calendar/calendare.interface';

export const createEvent = (date: string, workingHours: { start: string, end: string }): Event => {
  return {
    title: `Nuevo evento a las ${workingHours.start}`,
    start: new Date(date), // Converts the ISO string back to a Date object
    end: new Date(date), // You can adjust this if needed
    allDay: false,
  };
};
