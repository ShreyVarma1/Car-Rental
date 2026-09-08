import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import { BookingCompletionService } from "./booking-completion.service";

describe("BookingCompletionService", () => {
  let service: BookingCompletionService;

  const bookingRepository = {
    findBookingsPendingCompletion: jest.fn<
      () => Promise<
        Array<{
          id: string;
          referenceNumber: string;
          renterId: string;
          car: { ownerId: string; make: string; model: string };
        }>
      >
    >(),

    markBookingsCompleted: jest.fn<
      () => Promise<{ count: number }>
    >(),
  };

  const notificationService = {
    createNotification: jest.fn<() => Promise<unknown>>(),
  };

  const activityService = {
    createActivity: jest.fn<() => Promise<unknown>>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    notificationService.createNotification.mockResolvedValue(undefined);
    activityService.createActivity.mockResolvedValue(undefined);

    service = new BookingCompletionService(
      bookingRepository as any,
      notificationService as any,
      activityService as any,
    );
  });

  it("does nothing when there are no bookings past their drop-off time", async () => {
    bookingRepository.findBookingsPendingCompletion.mockResolvedValue([]);

    await service.completePastBookings();

    expect(bookingRepository.markBookingsCompleted).not.toHaveBeenCalled();
    expect(notificationService.createNotification).not.toHaveBeenCalled();
  });

  it("marks eligible bookings COMPLETED and notifies renter and owner", async () => {
    bookingRepository.findBookingsPendingCompletion.mockResolvedValue([
      {
        id: "booking-1",
        referenceNumber: "REF-1",
        renterId: "renter-1",
        car: {
          ownerId: "owner-1",
          make: "Honda",
          model: "City",
        },
      },
    ]);

    bookingRepository.markBookingsCompleted.mockResolvedValue({
      count: 1,
    });

    await service.completePastBookings();

    expect(bookingRepository.markBookingsCompleted).toHaveBeenCalledWith([
      "booking-1",
    ]);

    expect(notificationService.createNotification).toHaveBeenCalledTimes(2);
    expect(activityService.createActivity).toHaveBeenCalledTimes(1);
  });

  it("does not let a notification failure stop the batch from completing", async () => {
    bookingRepository.findBookingsPendingCompletion.mockResolvedValue([
      {
        id: "booking-1",
        referenceNumber: "REF-1",
        renterId: "renter-1",
        car: { ownerId: "owner-1", make: "Honda", model: "City" },
      },
    ]);

    bookingRepository.markBookingsCompleted.mockResolvedValue({
      count: 1,
    });

    notificationService.createNotification.mockRejectedValue(
      new Error("notification service down"),
    );

    await expect(service.completePastBookings()).resolves.not.toThrow();

    expect(bookingRepository.markBookingsCompleted).toHaveBeenCalledWith([
      "booking-1",
    ]);
  });
});
