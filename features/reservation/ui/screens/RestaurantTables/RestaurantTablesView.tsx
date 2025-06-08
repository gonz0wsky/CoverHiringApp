import { colors } from "@/core/theme/atoms";
import { StyleSheet, View } from "react-native";
import DateSelector from "./components/DateSelector";
import RoomMap from "./components/RoomMap/RoomMap";
import RoomSelector from "./components/RoomSelector";
import { useRestaurantTablesViewModel } from "./RestaurantTablesViewModel";
import TableEditAlert from "./TableEditAlert";

const RestaurantTablesView = () => {
  const {
    currentDate,
    currentRoomTables,
    currentSelectedRoomId,
    isLoading,
    rooms,
    setCurrentDate,
    setSelectedRoomId,
    handleOnPressTable,
    tableEditAlertRef,
  } = useRestaurantTablesViewModel();

  return (
    <View style={styles.main}>
      <DateSelector
        style={styles.dateSelector}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
      <RoomSelector
        style={styles.roomSelector}
        onPressRoom={setSelectedRoomId}
        rooms={rooms}
        selectedRoomId={currentSelectedRoomId}
      />
      <RoomMap tables={currentRoomTables} onPressTable={handleOnPressTable} />
      <TableEditAlert ref={tableEditAlertRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: colors.white },
  dateSelector: {
    marginHorizontal: 16,
  },
  roomSelector: {
    marginTop: 16,
  },
});

export default RestaurantTablesView;
