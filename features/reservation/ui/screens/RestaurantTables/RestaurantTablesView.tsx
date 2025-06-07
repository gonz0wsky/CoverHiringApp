import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRestaurantTablesViewModel } from "./RestaurantTablesViewModel";
import DateSelector from "./components/DateSelector";

const RestaurantTablesView = () => {
  const { currentDate, setCurrentDate } = useRestaurantTablesViewModel();

  return (
    <SafeAreaView style={styles.main}>
      <DateSelector
        style={styles.dateSelector}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {},
  dateSelector: {
    marginHorizontal: 16,
  },
});

export default RestaurantTablesView;
