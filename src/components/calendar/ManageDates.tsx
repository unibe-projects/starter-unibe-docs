import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_SCHEDULE_DAY, listScheduleDays } from '../../services/calendar/calendarService';
import LoadingSpinner from '../loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../error/messages/ErrorMessageRefresh';

interface ManageDatesProps {
  onDisableDate: (date: Date) => void;
  onEnableDate: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  userId: string | undefined;
}

const ManageDates: React.FC<ManageDatesProps> = ({
  onDisableDate,
  onEnableDate,
  onSelectDate,
  selectedDate,
  userId,
}) => {
  const { data, loading, error, refetch } = useQuery(listScheduleDays);
  const [createScheduleDay] = useMutation(CREATE_SCHEDULE_DAY);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const TIMEZONE_OFFSET = 60000;

  const getLocalDate = (): string => {
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * TIMEZONE_OFFSET);
    return localTime.toISOString().slice(0, 10);
  };

  const currentDateFormatted = getLocalDate();

  const isDateAlreadyScheduled = (date: string): boolean => {
    return data?.listScheduleDays?.items.some((scheduleDay: any) => scheduleDay.date === date);
  };

  const handleDisableDate = async (date: Date) => {
    try {
      await createScheduleDay({
        variables: {
          createdBy: userId,
          date: date.toISOString().slice(0, 10),
          isWorkingDay: false,
        },
      });
      onDisableDate(date);
      await refetch();
    } catch (error) {
      console.error('Error al deshabilitar el día:', error);
    }
  };

  const handleEnableDate = async (date: Date) => {
    try {
      await createScheduleDay({
        variables: {
          createdBy: userId,
          date: date.toISOString().slice(0, 10),
          isWorkingDay: true,
        },
      });
      onEnableDate(date);
      await refetch();
    } catch (error) {
      console.error('Error al habilitar el día:', error);
    }
  };

  // Paginar los días de programación
  const paginateDays = () => {
    if (!data?.listScheduleDays?.items) {
      return [];
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.listScheduleDays.items.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  } // Cambiado aquí para mostrar el spinner centrado
  if (error) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-4">Gestionar Días</h2>
      <div className="mb-4 w-full">
        <input
          type="date"
          min={currentDateFormatted}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value + 'T00:00:00');
            onSelectDate(selectedDate);
          }}
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {selectedDate && isDateAlreadyScheduled(selectedDate?.toISOString().slice(0, 10) || '') && (
          <p className="text-red-500 text-sm mt-2">Esta fecha ya está programada</p>
        )}
      </div>

      {selectedDate && !isDateAlreadyScheduled(selectedDate?.toISOString().slice(0, 10) || '') && (
        <div className="flex mb-4 gap-4 w-full">
          <button
            onClick={() => handleEnableDate(selectedDate)}
            className="bg-green-500 text-white p-3 rounded w-full md:w-auto"
          >
            Habilitar este día
          </button>
          <button
            onClick={() => handleDisableDate(selectedDate)}
            className="bg-red-500 text-white p-3 rounded w-full md:w-auto"
          >
            Deshabilitar este día
          </button>
        </div>
      )}

      <h3 className="font-semibold mt-4">Días de Programación:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginateDays().map((scheduleDay: any) => (
          <div
            key={scheduleDay.id}
            className={`p-4 border rounded-lg ${
              scheduleDay.is_working_day ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <p className="font-semibold">{scheduleDay.date}</p>
            <p>{scheduleDay.created_by}</p>
            <p>{scheduleDay.createdAt}</p>
            <p>{scheduleDay.is_working_day ? 'Laborable' : 'No Laborable'}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 disabled:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= data?.listScheduleDays?.items.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ManageDates;
