import { ReservationRepository } from "../domain/ReservationsRepository";
import { Room } from "../domain/Room";

const MOCK_RESTAURANT_ZONES: Room[] = [
  {
    id: "1",
    name: "Room 1",
    tables: [
      {
        id: "1",
        reservedBy: "John Doe",
        shape: "cicle",
        position: { x: 0, y: 0 },
      },
      {
        id: "2",
        reservedBy: null,
        shape: "cicle",
        position: { x: 50, y: 50 },
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
        shape: "cicle",
        position: { x: 100, y: 100 },
      },
      {
        id: "2",
        reservedBy: null,
        shape: "cicle",
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
