import useReservationsQuery from "@/features/reservation/api/useReservationsQuery";
import { useCallback, useMemo, useRef, useState } from "react";
import { TableEditAlertMethods } from "./TableEditAlert";

const useRestaurantTablesViewModel = () => {
  const tableEditAlertRef = useRef<TableEditAlertMethods>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { data, isLoading, error } = useReservationsQuery(currentDate);

  const currentSelectedRoomId = selectedRoomId ?? data?.[0]?.id ?? "";
  const currentRoomTables = useMemo(() => {
    const room = data?.find((room) => room.id === currentSelectedRoomId);
    if (!room) return [];

    return room.tables;
  }, [currentSelectedRoomId, data]);

  const handleOnPressTable = useCallback(
    (id: string) => {
      const table = currentRoomTables.find((table) => table.id === id);

      if (!table) return;

      const isReserved = !!table?.reservedBy;

      tableEditAlertRef.current?.setTableInfo({
        mode: isReserved ? "edit" : "create",
        id,
        name: table.reservedBy ?? "",
      });
    },
    [currentRoomTables]
  );

  return {
    currentDate,
    currentRoomTables,
    currentSelectedRoomId,
    error,
    handleOnPressTable,
    isLoading,
    rooms: data ?? [],
    setCurrentDate,
    setSelectedRoomId,
    tableEditAlertRef,
  };
};

export { useRestaurantTablesViewModel };
