import React, { useEffect, useState } from 'react';
import { Event } from '../../../interface/calendar/calendare.interface';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import EventModal from '../../../components/calendar/EventModal';
import { createEvent } from '../../../utils/calendar/createEvent';
import { isValidSelectedDate } from '../../../utils/calendar/dateUtils';
import { formatTime } from '../../../utils/calendar/timeUtils';
import ManageDates from '../../../components/calendar/ManageDates';
import { useAuth } from '../../../hooks/auth/useUser';
import { useQuery } from '@apollo/client';
import { listScheduleDays } from '../../../services/calendar/calendarService';

import TabSelector from '../../../components/calendar/TabSelector';
import MessageModal from '../../../components/calendar/MessageModal';
import { isDateAlreadyScheduled } from '../../../utils/calendar/isDateAlreadySchedule';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import { parseDateSafe } from '../../../utils/calendar/parseDateSafe';

const CalendarScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '09:30',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [enabledDates, setEnabledDates] = useState<Date[]>([]);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'calendar' | 'settings'>('calendar');
  const [showRegisterDayModal, setShowRegisterDayModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(listScheduleDays);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const startDateStr = start.toISOString().split('T')[0];
    const dateStatus = isDateAlreadyScheduled(startDateStr, data);
    executeDayAction(dateStatus, start);
  };

  const executeDayAction = (dateStatus: 'working' | 'non-working' | 'unknown', start: Date) => {
    switch (dateStatus) {
    case 'non-working':
      handleNonWorkingDay();
      break;
    case 'working':
      handleWorkingDay(start);
      break;
    case 'unknown':
      handleUnknownDay();
      break;
    default:
      break;
    }
  };

  const handleNonWorkingDay = () => {
    setErrorMessage('Este día está deshabilitado, no puedes agendar en este día.');
    setIsModalOpen(true);
  };

  const handleWorkingDay = (start: Date) => {
    if (isValidSelectedDate(start)) {
      setSelectedDate(start);
      setWorkingHours(getWorkingHours(start));
      setIsModalOpen(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('No puedes seleccionar una fecha pasada.');
      setIsModalOpen(true);
    }
  };

  const handleUnknownDay = () => {
    setShowRegisterDayModal(true);
    setIsModalOpen(false);
  };

  const getWorkingHours = (start: Date) => {
    const selectedHour = start.getHours();
    const selectedMinute = start.getMinutes();
    const formattedHour = formatTime(selectedHour, selectedMinute);

    return {
      start: formattedHour,
      end: formatTime(selectedHour + 1, selectedMinute),
    };
  };

  const handleSaveWorkingHours = () => {
    if (selectedDate && workingHours.start && workingHours.end) {
      const newEvent = createEvent(selectedDate.toISOString(), workingHours);

      if (newEvent) {
        setEvents([...events, newEvent]);
        setIsModalOpen(false);
      }
    } else {
      alert('Por favor, complete las horas de atención.');
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    setWorkingHours({ ...workingHours, [type]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseRegisterDayModal = () => {
    setShowRegisterDayModal(false);
  };

  const handleDisableDate = (date: Date) => {
    setDisabledDates([...disabledDates, date]);
    setEnabledDates(enabledDates.filter((d) => d.toDateString() !== date.toDateString()));
  };

  const handleEnableDate = (date: Date) => {
    setEnabledDates([...enabledDates, date]);
    setDisabledDates(disabledDates.filter((d) => d.toDateString() !== date.toDateString()));
  };

  const handleRetryFetch = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      const enabled: Date[] = [];
      const disabled: Date[] = [];

      data.listScheduleDays.items.forEach(
        (item: { date: string | number | Date; is_working_day: boolean }) => {
          const date = parseDateSafe(item.date as string);

          if (date) {
            if (item.is_working_day) {
              enabled.push(date);
            } else {
              disabled.push(date);
            }
          }
        },
      );
      setEnabledDates(enabled);
      setDisabledDates(disabled);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Horarios de Atención</h1>

      <TabSelector activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === 'calendar' && (
        <>
          {loading && <LoadingSpinner />}
          {error && (
            <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />
          )}
          {!loading && !error && (
            <>
              <CalendarComponent
                events={events}
                onSelectSlot={handleSelectSlot}
                disabledDates={disabledDates}
                enabledDates={enabledDates}
              />

              {isModalOpen && selectedDate && !errorMessage && (
                <EventModal
                  selectedDate={selectedDate}
                  workingHours={workingHours}
                  onTimeChange={handleTimeChange}
                  onSave={handleSaveWorkingHours}
                  onClose={handleCloseModal}
                />
              )}

              {isModalOpen && errorMessage && (
                <MessageModal
                  title="¡Alvertencia!"
                  message={errorMessage}
                  onClose={handleCloseModal}
                />
              )}

              {showRegisterDayModal && (
                <MessageModal
                  title="¡Alvertencia!"
                  message=" No puedes seleccionar este día"
                  onClose={handleCloseRegisterDayModal}
                />
              )}
            </>
          )}
        </>
      )}

      {activeTab === 'settings' && (
        <ManageDates
          onDisableDate={handleDisableDate}
          onEnableDate={handleEnableDate}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
          userId={user?.sub}
        />
      )}
    </div>
  );
};

export default CalendarScreen;
