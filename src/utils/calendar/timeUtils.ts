const ZERO_PAD_THRESHOLD = 10;

export const formatTime = (hour: number, minute: number): string => {
  return `${hour < ZERO_PAD_THRESHOLD ? '0' : ''}${hour}:${minute < ZERO_PAD_THRESHOLD ? '0' : ''}${minute}`;
};

export const parseTime = (time: string): [number, number] => {
  const [hour, minute] = time.split(':').map(Number);
  return [hour, minute];
};
