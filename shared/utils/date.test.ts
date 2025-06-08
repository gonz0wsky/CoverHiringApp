import { dateToString } from "./date";

describe("dateToString", () => {
  it("should format a date correctly using a valid format string", () => {
    const date = new Date(2025, 0, 1);
    const result = dateToString(date, "yyyy-MM-dd");
    expect(result).toBe("2025-01-01");
  });

  it("should format a date with a different format string", () => {
    const date = new Date(2025, 5, 8);
    const result = dateToString(date, "dd/MM/yyyy");
    expect(result).toBe("08/06/2025");
  });

  it("should return time when format string includes time", () => {
    const date = new Date(2025, 5, 8, 14, 30);
    const result = dateToString(date, "HH:mm");
    expect(result).toBe("14:30");
  });
});
