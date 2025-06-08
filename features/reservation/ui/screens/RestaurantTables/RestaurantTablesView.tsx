import { colors } from "@/core/theme/atoms";
import { StyleSheet, View } from "react-native";
import { useRestaurantTablesViewModel } from "./RestaurantTablesViewModel";
import DateSelector from "./components/DateSelector";
import RoomMap from "./components/RoomMap/RoomMap";
import RoomSelector from "./components/RoomSelector";

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
