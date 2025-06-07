import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import getReservationsByDate from "../application/getReservationsByDate";
import getReservationsImpl from "./GetReservationsImpl";

function useReservationsQuery(date: Date) {
  const formattedDate = format(date, "yyyyMMdd");

  return useQuery({
    queryKey: ["reservations", formattedDate],
    queryFn: () => getReservationsByDate(getReservationsImpl, date),
  });
}

export default useReservationsQuery;
