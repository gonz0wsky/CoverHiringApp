type RoomTable = {
  id: string;
  reservedBy: string | null;
  shape: "cicle" | "square" | "rectangle";
  position: {
    x: number;
    y: number;
  };
};

export { RoomTable };
