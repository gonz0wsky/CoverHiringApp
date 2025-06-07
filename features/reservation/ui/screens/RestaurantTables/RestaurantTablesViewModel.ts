import useReservationsQuery from "@/features/reservation/api/useReservationsQuery";
import { useState } from "react";

const useRestaurantTablesViewModel = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data, isLoading } = useReservationsQuery(currentDate);

  return { currentDate, setCurrentDate, rooms: data ?? [], isLoading };
};

export { useRestaurantTablesViewModel };
