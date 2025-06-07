import { useState } from "react";

const useRestaurantTablesViewModel = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return { currentDate, setCurrentDate };
};

export { useRestaurantTablesViewModel };
