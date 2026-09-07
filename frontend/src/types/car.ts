export type CarStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type CarType =
  | "HATCHBACK"
  | "SEDAN"
  | "SUV"
  | "MUV"
  | "LUXURY"
  | "ELECTRIC";

export type Transmission =
  | "MANUAL"
  | "AUTOMATIC";

export type FuelType =
  | "PETROL"
  | "DIESEL"
  | "ELECTRIC"
  | "HYBRID"
  | "CNG";

export interface CarOwner {
  id: string;
  name: string;
  email: string;
}

export interface Car {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  type: CarType;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  city: string;
  pricePerDay: string | number;
  status: CarStatus;
  owner?: CarOwner;
  createdAt: string;
  updatedAt: string;
}

export interface SearchCarsParams {
  page?: number;
  limit?: number;
  city?: string;
  type?: CarType;
  transmission?: Transmission;
  fuel?: FuelType;
  seats?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  pickupAt?: string;
  dropOffAt?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CarSearchResponse {
  data: Car[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}