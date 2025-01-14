import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_WORKING_HOURS } from '../../services/calendar/calendarService';

interface EventModalProps {
  selectedDate: Date;
  workingHours: { start: string; end: string };
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => void;
  onClose: () => void;
  idDaySelect: string;
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  workingHours,
  onTimeChange,
  onClose,
  idDaySelect,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createWorkingHours] = useMutation(CREATE_WORKING_HOURS);

  const handleSaveWorkingHours = async () => {
    if (selectedDate && workingHours.start && workingHours.end) {
      try {
        await createWorkingHours({
          variables: {
            startTime: workingHours.start,
            endTime: workingHours.end,
            workingHoursDayId: idDaySelect,
          },
        });
        onClose();
      } catch (error) {
        setErrorMessage('Hubo un error al guardar el horario.');
      }
    } else {
      setErrorMessage('Por favor, complete las horas de inicio y fin.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6 rounded-3xl shadow-2xl w-full max-w-md transform scale-95 transition-transform duration-300 hover:scale-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Seleccionaste el día: <span className="text-blue-500">{selectedDate.toDateString()}</span>
        </h2>

        {errorMessage && (
          <div className="text-red-600 bg-red-100 p-2 rounded-lg mb-4 text-sm shadow-sm">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hora de inicio:</label>
          <input
            type="time"
            value={workingHours.start}
            onChange={(e) => onTimeChange(e, 'start')}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Hora de fin:</label>
          <input
            type="time"
            value={workingHours.end}
            onChange={(e) => onTimeChange(e, 'end')}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleSaveWorkingHours}
            className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
          >
            Guardar Horario
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-500 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
