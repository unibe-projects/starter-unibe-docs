import { Event } from '../../interface/calendar/calendare.interface';

export const createEvent = (date: string, workingHours: { start: string; end: string }): Event => {
  return {
    title: `Nuevo evento a las ${workingHours.start}`,
    start: new Date(date),
    end: new Date(date),
    allDay: false,
  };
};
