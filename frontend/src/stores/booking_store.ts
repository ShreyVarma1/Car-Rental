import { create } from "zustand";

/**
 * Booking Wizard Store
 *
 * Carries state across the multi-step booking flow:
 *   Step 1 → pick dates          (/bookings/new?carId=xxx)
 *   Step 2 → pick add-ons        (same page, or a future split step)
 *   Step 3 → review & confirm    (payment summary before API call)
 *
 * Why Zustand here:
 *   useState dies on navigation — if the user goes back from the review
 *   step, their selections are lost. This store persists them in memory
 *   for the entire session without any URL params or sessionStorage hacks.
 */

interface BookingStore {
  // Step 1
  carId: string;
  pickupAt: string;
  dropOffAt: string;

  // Step 2
  selectedAddOnIds: string[];

  // Actions
  setDates: (
    carId: string,
    pickupAt: string,
    dropOffAt: string,
  ) => void;

  toggleAddOn: (id: string) => void;

  setSelectedAddOnIds: (ids: string[]) => void;

  /** Call this after booking is confirmed so the store is clean for next time */
  reset: () => void;
}

const initialState = {
  carId: "",
  pickupAt: "",
  dropOffAt: "",
  selectedAddOnIds: [] as string[],
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialState,

  setDates: (carId, pickupAt, dropOffAt) =>
    set({ carId, pickupAt, dropOffAt }),

  toggleAddOn: (id) =>
    set((state) => ({
      selectedAddOnIds: state.selectedAddOnIds.includes(id)
        ? state.selectedAddOnIds.filter((x) => x !== id)
        : [...state.selectedAddOnIds, id],
    })),

  setSelectedAddOnIds: (ids) =>
    set({ selectedAddOnIds: ids }),

  reset: () => set(initialState),
}));
