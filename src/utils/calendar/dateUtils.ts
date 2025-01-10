// utils/dateUtils.ts

export const isValidSelectedDate = (selectedDate: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reseteamos la hora a las 00:00 para comparar solo fechas
  
    // Comparamos la fecha seleccionada con la fecha actual (sin horas)
    return selectedDate >= today;
  };
  