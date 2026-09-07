export function hasDateRangeOverlap(
  existingPickup: Date,
  existingDropOff: Date,
  requestedPickup: Date,
  requestedDropOff: Date,
): boolean {
  return (
    existingPickup < requestedDropOff &&
    existingDropOff > requestedPickup
  );
}