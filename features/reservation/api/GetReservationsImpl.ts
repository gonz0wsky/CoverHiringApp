import { CONFIG } from "@/core/config";
import { dateToString } from "@/shared/utils/date";
import { ReservationRepository } from "../domain/ReservationsRepository";
import { Room } from "../domain/Room";
import { GetReservationsDTO } from "./GetReservationDTO";

const getReservationsByDate: ReservationRepository["getReservationsByDate"] =
  async (date: Date) => {
    try {
      const response = await fetch(
        `${CONFIG.API_URL}?date=${dateToString(date, "yyyyMMdd")}`
      );

      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as GetReservationsDTO;

      const roomsList: Room[] = [
        {
          id: data.room.name,
          name: data.room.name,
          tables: data.tables.map((table) => ({
            id: table.id,
            reservedBy: table.name,
            shape: table.shape,
            position: {
              x: table.position.x,
              y: table.position.y,
            },
          })),
        },
      ];

      return roomsList;
    } catch (error) {
      return [];
    }
  };

const ReservationRepositoryImpl: ReservationRepository = {
  getReservationsByDate,
};

export default ReservationRepositoryImpl;
