import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRestaurantTablesViewModel } from "./RestaurantTablesViewModel";
import DateSelector from "./components/DateSelector";
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
  } = useRestaurantTablesViewModel();

  return (
    <SafeAreaView style={styles.main}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {},
  dateSelector: {
    marginHorizontal: 16,
  },
  roomSelector: {
    marginTop: 16,
  },
});

export default RestaurantTablesView;
