import { ReservationRepository } from "../domain/ReservationsRepository";
import { Room } from "../domain/Room";
import getReservationsByDate from "./getReservationsByDate";

describe("getReservationsByDate", () => {
  it("should return reservations for a given date", async () => {
    const mockDate = new Date("2025-06-08");

    const mockRooms: Room[] = [
      {
        id: "1",
        name: "Room A",
        tables: [
          {
            id: "1",
            reservedBy: "Alice",
            shape: "circle",
            position: {
              x: 0,
              y: 0,
            },
          },
        ],
      },
      {
        id: "2",
        name: "Room B",
        tables: [
          {
            id: "2",
            reservedBy: "Bob",
            shape: "circle",
            position: {
              x: 0,
              y: 0,
            },
          },
        ],
      },
    ];

    const repository: ReservationRepository = {
      getReservationsByDate: jest.fn().mockResolvedValue(mockRooms),
    };

    const result = await getReservationsByDate(repository, mockDate);

    expect(repository.getReservationsByDate).toHaveBeenCalledWith(mockDate);
    expect(result).toEqual(mockRooms);
  });
});
