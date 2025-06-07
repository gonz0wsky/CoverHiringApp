import { format } from "date-fns";

const dateToString = (date: Date, formatString: string): string => {
  return format(date, formatString);
};

export { dateToString };
