import { Room } from "./Room";

interface ReservationRepository {
  getReservationsByDate(date: Date): Promise<Room[]>;
}

export { ReservationRepository };
