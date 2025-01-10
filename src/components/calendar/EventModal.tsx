import React from 'react';

interface EventModalProps {
  selectedDate: Date;
  workingHours: { start: string; end: string };
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => void;
  onSave: () => void;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  workingHours,
  onTimeChange,
  onSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">
          Seleccionaste el día: {selectedDate.toDateString()}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hora de inicio:</label>
          <input
            type="time"
            value={workingHours.start}
            onChange={(e) => onTimeChange(e, 'start')}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hora de fin:</label>
          <input
            type="time"
            value={workingHours.end}
            onChange={(e) => onTimeChange(e, 'end')}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Guardar Horario
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
