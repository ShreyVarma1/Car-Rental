import {
  apiRequest,
} from "./api";

import {
  AddOn,
} from "@/types/addon";

export function getAddOns() {
  return apiRequest<AddOn[]>(
    "/addons",
  );
}