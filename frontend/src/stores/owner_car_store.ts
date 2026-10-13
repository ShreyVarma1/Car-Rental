import { create } from "zustand";

import { Car } from "@/types/car";

/**
 * Owner Car Dialog Store
 *
 * Manages the open/close and form state for the Create and Edit car
 * dialogs on the Owner Cars page.
 *
 * Why Zustand here:
 *   The OwnerCarsPage currently has 6+ useState calls just for dialog
 *   state (createOpen, createForm, createError, editCar, editForm,
 *   editError). Grouping them in a store makes the component leaner,
 *   and if more dialogs are added (e.g. "view bookings for this car")
 *   they slot in here without touching the parent component's logic.
 */

export interface CarFormData {
  make: string;
  model: string;
  year: string;
  type: string;
  transmission: string;
  fuel: string;
  seats: string;
  city: string;
  pricePerDay: string;
  images: string;
}

export const DEFAULT_CAR_FORM: CarFormData = {
  make: "",
  model: "",
  year: "",
  type: "",
  transmission: "",
  fuel: "",
  seats: "",
  city: "",
  pricePerDay: "",
  images: "",
};

interface OwnerCarStore {
  // ── Create dialog ──────────────────────────────────────────────────
  createOpen: boolean;
  createForm: CarFormData;
  createError: string;

  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  setCreateField: (field: keyof CarFormData, value: string) => void;
  setCreateError: (error: string) => void;

  // ── Edit dialog ────────────────────────────────────────────────────
  editCar: Car | null;
  editForm: CarFormData;
  editError: string;

  openEditDialog: (car: Car) => void;
  closeEditDialog: () => void;
  setEditField: (field: keyof CarFormData, value: string) => void;
  setEditError: (error: string) => void;
}

export const useOwnerCarStore = create<OwnerCarStore>((set) => ({
  // ── Create ─────────────────────────────────────────────────────────
  createOpen: false,
  createForm: DEFAULT_CAR_FORM,
  createError: "",

  openCreateDialog: () =>
    set({
      createOpen: true,
      createForm: DEFAULT_CAR_FORM,
      createError: "",
    }),

  closeCreateDialog: () =>
    set({
      createOpen: false,
      createForm: DEFAULT_CAR_FORM,
      createError: "",
    }),

  setCreateField: (field, value) =>
    set((state) => ({
      createForm: { ...state.createForm, [field]: value },
    })),

  setCreateError: (error) => set({ createError: error }),

  // ── Edit ───────────────────────────────────────────────────────────
  editCar: null,
  editForm: DEFAULT_CAR_FORM,
  editError: "",

  openEditDialog: (car) =>
    set({
      editCar: car,
      editError: "",
      editForm: {
        make: car.make,
        model: car.model,
        year: String(car.year),
        type: car.type,
        transmission: car.transmission,
        fuel: car.fuel,
        seats: String(car.seats),
        city: car.city,
        pricePerDay: String(car.pricePerDay),
        images: (car.images ?? []).join("\n"),
      },
    }),

  closeEditDialog: () =>
    set({
      editCar: null,
      editForm: DEFAULT_CAR_FORM,
      editError: "",
    }),

  setEditField: (field, value) =>
    set((state) => ({
      editForm: { ...state.editForm, [field]: value },
    })),

  setEditError: (error) => set({ editError: error }),
}));
