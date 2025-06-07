type RoomTable = {
  id: string;
  reservedBy: string | null;
  shape: "circle" | "square" | "rectangle";
  position: {
    x: number;
    y: number;
  };
};

export { RoomTable };
