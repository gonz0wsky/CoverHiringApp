import { ReservationRepository } from "../domain/ReservationsRepository";
import { Room } from "../domain/Room";

const MOCK_RESTAURANT_ZONES: Room[] = [
  {
    id: "1",
    name: "Room 1",
    tables: [
      {
        id: "1",
        reservedBy: "Alice",
        shape: "circle",
        position: { x: 123, y: 456 },
      },
      {
        id: "2",
        reservedBy: null,
        shape: "square",
        position: { x: 789, y: 234 },
      },
      {
        id: "3",
        reservedBy: "Bob",
        shape: "rectangle",
        position: { x: 567, y: 890 },
      },
      {
        id: "4",
        reservedBy: null,
        shape: "circle",
        position: { x: 321, y: 654 },
      },
      {
        id: "5",
        reservedBy: "Carol",
        shape: "square",
        position: { x: 432, y: 210 },
      },
      {
        id: "6",
        reservedBy: null,
        shape: "rectangle",
        position: { x: 876, y: 543 },
      },
      {
        id: "7",
        reservedBy: "Dave",
        shape: "circle",
        position: { x: 111, y: 222 },
      },
      {
        id: "8",
        reservedBy: null,
        shape: "square",
        position: { x: 999, y: 888 },
      },
      {
        id: "9",
        reservedBy: "Eve",
        shape: "rectangle",
        position: { x: 135, y: 246 },
      },
      {
        id: "10",
        reservedBy: null,
        shape: "circle",
        position: { x: 357, y: 468 },
      },
    ],
  },
  {
    id: "2",
    name: "Room 2",
    tables: [
      {
        id: "1",
        reservedBy: null,
        shape: "rectangle",
        position: { x: 100, y: 100 },
      },
      {
        id: "2",
        reservedBy: null,
        shape: "circle",
        position: { x: 150, y: 150 },
      },
    ],
  },
];

const getReservationsByDate: ReservationRepository["getReservationsByDate"] = (
  date: Date
) => {
  return Promise.resolve(MOCK_RESTAURANT_ZONES);
};

const ReservationRepositoryImpl: ReservationRepository = {
  getReservationsByDate,
};

export default ReservationRepositoryImpl;
