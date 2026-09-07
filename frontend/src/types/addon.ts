export interface AddOn {
  id: string;
  name: string;
  description?: string | null;
  pricePerDay: string | number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}