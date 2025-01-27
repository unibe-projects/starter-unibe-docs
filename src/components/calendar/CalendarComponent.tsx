import React, { useMemo } from 'react';
import { Calendar } from 'react-big-calendar';
import localizer from '../../utils/calendar/calendarLocalizer';

export enum ActivitiesStatusEnum {
  EARRING = 'EARRING',
  COMPLETED = 'COMPLETED',
  CANCELADA = 'CANCELADA',
  IN_PROGRESS = 'IN_PROGRESS',
}

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

const getStatusColor = (status: ActivitiesStatusEnum): string => {
  switch (status) {
  case ActivitiesStatusEnum.EARRING:
    return '#FFA500';
  case ActivitiesStatusEnum.COMPLETED:
    return '#4CAF50';
  case ActivitiesStatusEnum.CANCELADA:
    return '#F44336';
  case ActivitiesStatusEnum.IN_PROGRESS:
    return '#2196F3';
  default:
    return '#9E9E9E';
  }
};

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
        title: `${name || 'Sin título'} (${status})`,
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
