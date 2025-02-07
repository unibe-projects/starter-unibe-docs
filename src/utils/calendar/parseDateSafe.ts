import { parse } from 'date-fns';

export const parseDateSafe = (dateString: string): Date | null => {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};
