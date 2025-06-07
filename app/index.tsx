import { QueryClientProvider } from "@/core/query-client/QueryClientProvider";
import RestaurantTablesView from "@/features/reservation/ui/screens/RestaurantTables/RestaurantTablesView";

const App = () => {
  return (
    <QueryClientProvider>
      <RestaurantTablesView />
    </QueryClientProvider>
  );
};

export default App;
