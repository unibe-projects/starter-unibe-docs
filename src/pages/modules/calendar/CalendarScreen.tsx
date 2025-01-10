import React, { useState } from 'react';
import { Event } from '../../../interface/calendar/calendare.interface';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import EventModal from '../../../components/calendar/EventModal';

const CalendarScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '09:30',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);

    const selectedHour = start.getHours();
    const selectedMinute = start.getMinutes();
    const formattedHour = `${selectedHour < 10 ? '0' : ''}${selectedHour}:${selectedMinute < 10 ? '0' : ''}${selectedMinute}`;

    setWorkingHours({
      start: formattedHour,
      end: `${selectedHour < 10 ? '0' : ''}${selectedHour + 1}:00`,
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    setWorkingHours({ ...workingHours, [type]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveWorkingHours = () => {
    if (selectedDate && workingHours.start && workingHours.end) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);

      const [startHour, startMinute] = workingHours.start.split(':').map(Number);
      const [endHour, endMinute] = workingHours.end.split(':').map(Number);

      startDate.setHours(startHour, startMinute, 0);
      endDate.setHours(endHour, endMinute, 0);

      const newEvent: Event = {
        title: 'Atención al paciente',
        start: startDate,
        end: endDate,
        allDay: false,
      };

      setEvents([...events, newEvent]);
      setIsModalOpen(false);
    } else {
      alert('Por favor, complete las horas de atención.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Horarios de Atención</h1>

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
