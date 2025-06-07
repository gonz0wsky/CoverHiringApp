import { ReservationRepository } from "../domain/ReservationsRepository";
import { Room } from "../domain/Room";

const getReservationsByDate = async (
  repository: ReservationRepository,
  date: Date
): Promise<Room[]> => {
  return repository.getReservationsByDate(date);
};

export default getReservationsByDate;
