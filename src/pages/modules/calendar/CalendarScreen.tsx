import React, { useState, useEffect } from 'react';
import { Event } from '../../../interface/calendar/calendare.interface';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import EventModal from '../../../components/calendar/EventModal';
import { createEvent } from '../../../utils/calendar/createEvent';
import { isValidSelectedDate } from '../../../utils/calendar/dateUtils';
import { formatTime } from '../../../utils/calendar/timeUtils';
import ManageDates from '../../../components/calendar/ManageDates'; // Importar el componente
import { useAuth } from '../../../hooks/auth/useUser';
import { useQuery } from '@apollo/client';
import { listScheduleDays } from '../../../services/calendar/calendarService';

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

  const isDateAlreadyScheduled = (date: string): 'working' | 'non-working' | 'unknown' => {
    const scheduleDay = data?.listScheduleDays?.items.find(
      (scheduleDay: any) => scheduleDay.date === date
    );

    if (!scheduleDay) {
      return 'unknown'; // No hay información sobre este día.
    }

    return scheduleDay.is_working_day ? 'working' : 'non-working';
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const startDateStr = start.toISOString().split('T')[0];
    const dateStatus = isDateAlreadyScheduled(startDateStr);

    console.log('startDateStr', startDateStr);

    if (dateStatus === 'non-working') {
      setErrorMessage('No puedes agendar en este día.');
      setIsModalOpen(true); // Abrir el modal con el mensaje de error
    } else if (dateStatus === 'working') {
      if (isValidSelectedDate(start)) {
        setSelectedDate(start);
        setIsModalOpen(true);

        const selectedHour = start.getHours();
        const selectedMinute = start.getMinutes();
        const formattedHour = formatTime(selectedHour, selectedMinute);

        setWorkingHours({
          start: formattedHour,
          end: formatTime(selectedHour + 1, selectedMinute),
        });

        setErrorMessage(null);
      } else {
        setErrorMessage('No puedes seleccionar una fecha pasada.');
      }
    } else {
      setShowRegisterDayModal(true);
      setIsModalOpen(false);
    }
  };

  const handleCloseRegisterDayModal = () => {
    setShowRegisterDayModal(false);
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

  const handleDisableDate = (date: Date) => {
    setDisabledDates([...disabledDates, date]);
    setEnabledDates(enabledDates.filter((d) => d.toDateString() !== date.toDateString()));
  };

  const handleEnableDate = (date: Date) => {
    setEnabledDates([...enabledDates, date]);
    setDisabledDates(disabledDates.filter((d) => d.toDateString() !== date.toDateString()));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Horarios de Atención</h1>

      {/* Controles para cambiar entre las pestañas */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`mr-4 p-2 ${activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Calendario
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`p-2 ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Configuración de Días
        </button>
      </div>

      {/* Mostrar calendario si la pestaña activa es "calendar" */}
      {activeTab === 'calendar' && (
        <>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

          <CalendarComponent
            events={events}
            onSelectSlot={handleSelectSlot}
          />

          {isModalOpen && selectedDate && (
            <EventModal
              selectedDate={selectedDate}
              workingHours={workingHours}
              onTimeChange={handleTimeChange}
              onSave={handleSaveWorkingHours}
              onClose={handleCloseModal}
            />
          )}

          {/* Modal para mostrar el mensaje de error */}
          {isModalOpen && errorMessage && (
            <div className="modal">
              <div className="modal-content">
                <h2>Alerta</h2>
                <p>{errorMessage}</p>
                <button onClick={handleCloseModal}>Cerrar</button>
              </div>
            </div>
          )}

          {/* Modal para registrar un día no encontrado en el calendario */}
          {showRegisterDayModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>¡Registra este día!</h2>
                <p>Este día no tiene un estado definido, ¿quieres agregarlo como un día de trabajo?</p>
                <button onClick={handleCloseRegisterDayModal}>Cerrar</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Mostrar configuración de días si la pestaña activa es "settings" */}
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
