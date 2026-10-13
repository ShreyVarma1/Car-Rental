import { create } from "zustand";

import { SearchCarsParams } from "@/types/car";

/**
 * Car Filter Store
 *
 * Persists the user's search filters across navigation.
 *
 * Why Zustand here:
 *   Currently filters live in useState inside CarsPage. The moment
 *   a user clicks a car to view its detail and hits "Back", the filters
 *   reset to defaults — they have to search all over again.
 *   This store keeps the filters alive across the /cars ↔ /cars/[id]
 *   round trip for the entire session.
 */

const DEFAULT_FILTERS: SearchCarsParams = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

interface CarFilterStore {
  filters: SearchCarsParams;

  /** Replace all filters (resets page to 1 automatically) */
  setFilters: (filters: SearchCarsParams) => void;

  /** Change just the page number, keeping every other filter intact */
  setPage: (page: number) => void;

  /** Clear all filters back to defaults */
  reset: () => void;
}

export const useCarFilterStore = create<CarFilterStore>((set) => ({
  filters: DEFAULT_FILTERS,

  setFilters: (filters) =>
    set({ filters: { ...filters, page: 1, limit: 10 } }),

  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),

  reset: () => set({ filters: DEFAULT_FILTERS }),
}));
