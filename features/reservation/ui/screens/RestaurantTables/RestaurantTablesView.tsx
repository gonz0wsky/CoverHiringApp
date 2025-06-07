import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RestaurantTablesView = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>RestaurantTablesView</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RestaurantTablesView;
