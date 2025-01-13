import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { Event } from '../../interface/calendar/calendare.interface';
import localizer from '../../utils/calendar/calendarLocalizer';
import { useQuery } from '@apollo/client';
import { listScheduleDays } from '../../services/calendar/calendarService';

interface CalendarComponentProps {
  events: Event[];
  onSelectSlot: ({ start }: { start: Date }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onSelectSlot, }) => {
  const { data, loading, error, refetch } = useQuery(listScheduleDays);
  const [availableDates, setAvailableDates] = useState<{ enabled: Set<string>, disabled: Set<string> }>({ enabled: new Set(), disabled: new Set() });

  console.log(availableDates)

  useEffect(() => {
    if (data && data.listScheduleDays.items) {
      const enabled = new Set<string>();
      const disabled = new Set<string>();

      data.listScheduleDays.items.forEach((item: { date: string, is_working_day: boolean }) => {
        if (item.is_working_day) {
          enabled.add(item.date);
        } else {
          disabled.add(item.date);
        }
      });

      setAvailableDates({ enabled, disabled });
    }
  }, [data]);



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
