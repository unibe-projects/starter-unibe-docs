import React from 'react';
import { Calendar } from 'react-big-calendar';
import { Event } from '../../interface/calendar/calendare.interface';
import localizer from '../../utils/calendar/calendarLocalizer';

interface CalendarComponentProps {
  events: Event[];
  onSelectSlot: ({ start }: { start: Date }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onSelectSlot }) => {
  return (
    <div className="h-[80vh] overflow-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={onSelectSlot}
        selectable
      />
    </div>
  );
};

export default CalendarComponent;
