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
      },
      {
        id: "2",
        reservedBy: null,
        shape: "cicle",
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
      },
      {
        id: "2",
        reservedBy: null,
        shape: "cicle",
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
