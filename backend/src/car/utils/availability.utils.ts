export function hasDateRangeOverlap(
  existingPickupAt: Date,
  existingDropOffAt: Date,
  requestedPickupAt: Date,
  requestedDropOffAt: Date,
): boolean {
  return (
    existingPickupAt <
      requestedDropOffAt &&
    existingDropOffAt >
      requestedPickupAt
  );
}