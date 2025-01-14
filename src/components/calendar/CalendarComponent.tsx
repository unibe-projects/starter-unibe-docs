import React, { useMemo } from 'react';
import { Calendar } from 'react-big-calendar';
import { Event } from '../../interface/calendar/calendare.interface';
import localizer from '../../utils/calendar/calendarLocalizer';
import { useQuery } from '@apollo/client';
import { LIST_WORKING_HOURS } from '../../services/calendar/calendarService';
import LoadingSpinner from '../loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../error/messages/ErrorMessageRefresh';

interface CalendarComponentProps {
  onSelectSlot?: ({ start }: { start: Date }) => void;
  disabledDates: Date[];
  enabledDates: Date[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onSelectSlot,
  disabledDates: propDisabledDates,
  enabledDates: propEnabledDates,
}) => {
  const { data, loading, error, refetch } = useQuery(LIST_WORKING_HOURS);
  const events: Event[] = useMemo(() => {
    if (!data || !data.listWorkingHours) {
      return [];
    }

    return data.listWorkingHours.items
      .filter((item: any) => item.day_id.is_working_day)
      .map((item: any) => ({
        title: `Disponible: ${item.start_time} - ${item.end_time}`,
        start: new Date(item.day_id.date + 'T' + item.start_time),
        end: new Date(item.day_id.date + 'T' + item.end_time),
      }));
  }, [data]);

  const enabledDates = useMemo(() => {
    const datesFromEvents = events.map((event) => event.start);
    return [...propEnabledDates, ...datesFromEvents];
  }, [events, propEnabledDates]);

  const disabledDates = useMemo(() => {
    const datesFromData =
      data?.listWorkingHours.items
        .filter((item: any) => !item.day_id.is_working_day)
        .map((item: any) => new Date(item.day_id.date)) || [];
    return [...propDisabledDates, ...datesFromData];
  }, [data, propDisabledDates]);

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

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    if (onSelectSlot) {
      onSelectSlot(slotInfo);
    }
  };

  return (
    <div className="h-[80vh] overflow-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        dayPropGetter={(date: any) => ({
          className: getDateClass(date),
        })}
      />
    </div>
  );
};

export default CalendarComponent;
