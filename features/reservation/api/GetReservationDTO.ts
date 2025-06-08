interface GetReservationsDTO {
  room: {
    name: string;
  };
  selectedDate: string;
  tables: {
    id: string;
    name: string;
    isReserved: boolean;
    position: {
      x: number;
      y: number;
    };
    shape: "square" | "circle" | "rectangle";
  }[];
}

export { GetReservationsDTO };
