// CalendarScreen.tsx
import React, { useState } from 'react';
import { Event } from '../../../interface/calendar/calendare.interface';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import EventModal from '../../../components/calendar/EventModal';
import { createEvent } from '../../../utils/calendar/createEvent';
import { isValidSelectedDate } from '../../../utils/calendar/dateUtils';
import { formatTime } from '../../../utils/calendar/timeUtils';

const CalendarScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '09:30',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectSlot = ({ start }: { start: Date }) => {
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
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    setWorkingHours({ ...workingHours, [type]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Horarios de Atención</h1>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <CalendarComponent events={events} onSelectSlot={handleSelectSlot} />

      {isModalOpen && selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          workingHours={workingHours}
          onTimeChange={handleTimeChange}
          onSave={handleSaveWorkingHours}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CalendarScreen;
