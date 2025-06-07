import { QueryClientProvider } from "@/core/query-client/QueryClientProvider";
import RestaurantTablesView from "@/features/reservation/ui/screens/RestaurantTables/RestaurantTablesView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider>
        <RestaurantTablesView />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
