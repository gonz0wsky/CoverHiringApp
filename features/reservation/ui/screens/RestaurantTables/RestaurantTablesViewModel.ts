import useReservationsQuery from "@/features/reservation/api/useReservationsQuery";
import { useMemo, useState } from "react";

const useRestaurantTablesViewModel = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { data, isLoading } = useReservationsQuery(currentDate);

  const currentSelectedRoomId = selectedRoomId ?? data?.[0]?.id ?? "";
  const currentRoomTables = useMemo(() => {
    const room = data?.find((room) => room.id === currentSelectedRoomId);
    if (!room) return [];

    return room.tables;
  }, [currentSelectedRoomId, data]);

  return {
    currentDate,
    isLoading,
    rooms: data ?? [],
    currentSelectedRoomId,
    currentRoomTables,
    setCurrentDate,
    setSelectedRoomId,
  };
};

export { useRestaurantTablesViewModel };
