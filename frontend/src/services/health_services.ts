import { apiRequest } from "./api";

export interface HealthResponse {
  status: string;
  database: string;
  uptime: number;
  timestamp: string;
}

export function getHealth() {
  return apiRequest<HealthResponse>("/health");
}