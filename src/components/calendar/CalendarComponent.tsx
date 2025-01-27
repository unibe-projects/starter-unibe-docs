import React, { useMemo } from 'react';
import { Calendar, EventProps } from 'react-big-calendar';
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

// Función para asignar colores según el estado
const getStatusColor = (status: ActivitiesStatusEnum): string => {
  switch (status) {
    case ActivitiesStatusEnum.EARRING:
      return '#FFA500'; // Naranja
    case ActivitiesStatusEnum.COMPLETED:
      return '#4CAF50'; // Verde
    case ActivitiesStatusEnum.CANCELADA:
      return '#F44336'; // Rojo
    case ActivitiesStatusEnum.IN_PROGRESS:
      return '#2196F3'; // Azul
    default:
      return '#9E9E9E'; // Gris para valores no definidos
  }
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ data }) => {
  console.log('data componente:', data);

  // Mapear los datos a eventos con colores basados en el estado
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
        title: `${name || 'Sin título'} (${status})`, // Mostrar el título y el estado
        start,
        end,
        allDay: false,
        status,
        color,
      };
    });
  }, [data]);

  // Personalizar el estilo del evento según su color
  const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
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
