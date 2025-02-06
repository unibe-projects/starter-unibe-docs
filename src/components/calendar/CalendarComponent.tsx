import React, { useMemo } from 'react';
import { Calendar } from 'react-big-calendar';
import localizer from '../../utils/calendar/calendarLocalizer';
import { getStatusColor } from '../../utils/getStatusColor';
import { ActivitiesStatusEnum } from '../../enums/activities/ActivitiesStatusEnum';
import { translateActivityStatus } from '../../utils/translateActivityStatus';


interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  status: ActivitiesStatusEnum;
  color?: string;
}

interface CalendarComponentProps {
  data: any;
}


const CalendarComponent: React.FC<CalendarComponentProps> = ({ data }) => {
  const events: Event[] = useMemo(() => {
    if (!data || !data.listActivities) {
      return [];
    }

    return data.listActivities.items.map((item: any) => {
      const { activity_date, start_time, hora_fin, name, status } = item;

      const start = new Date(`${activity_date}T${start_time}`);
      const end = new Date(`${activity_date}T${hora_fin}`);
      const color = getStatusColor(status);

      return {
        title: `${name || 'Sin título'} (${translateActivityStatus(status)})`,
        start,
        end,
        allDay: false,
        status,
        color,
      };
    });
  }, [data]);

  const eventStyleGetter = (event: Event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="h-[80vh] overflow-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        selectable
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarComponent;
