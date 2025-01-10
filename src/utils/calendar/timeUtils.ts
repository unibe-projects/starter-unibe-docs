// utils/timeUtils.ts

export const formatTime = (hour: number, minute: number): string => {
    return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
  };
  
  export const parseTime = (time: string): [number, number] => {
    const [hour, minute] = time.split(':').map(Number);
    return [hour, minute];
  };
  