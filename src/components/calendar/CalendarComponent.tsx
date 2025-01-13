import React from 'react';
import { Calendar } from 'react-big-calendar';
import { Event } from '../../interface/calendar/calendare.interface';
import localizer from '../../utils/calendar/calendarLocalizer';

interface CalendarComponentProps {
  events: Event[];
  onSelectSlot: ({ start }: { start: Date }) => void;
  disabledDates: Date[];
  enabledDates: Date[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events,
  onSelectSlot,
  disabledDates,
  enabledDates,
}) => {
  const checkDateStatus = (date: Date) => {
    if (disabledDates.some((d) => d.toDateString() === date.toDateString())) {
      return 'disabled';
    }
    if (enabledDates.some((d) => d.toDateString() === date.toDateString())) {
      return 'enabled';
    }
    return 'normal';
  };

  const getDateClass = (date: Date) => {
    const status = checkDateStatus(date);
    switch (status) {
    case 'disabled':
      return 'bg-red-100';
    case 'enabled':
      return 'bg-green-100';
    default:
      return '';
    }
  };

  return (
    <div className="h-[80vh] overflow-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={onSelectSlot}
        selectable
        dayPropGetter={(date: any) => ({
          className: getDateClass(date),
        })}
      />
    </div>
  );
};

export default CalendarComponent;
