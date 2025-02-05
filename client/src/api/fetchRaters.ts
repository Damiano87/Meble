import { type RatersResponse } from "@/utils/types";
import apiRequest from "./apiRequest";

// get product ratings from api
export const fetchRaters = async (
  productId: string,
  page: string,
  limit: string,
  numberOfStars?: string[]
): Promise<RatersResponse> => {
  const response = await apiRequest.get<RatersResponse>(
    `/ratings/products/${productId}/raters`,
    {
      params: { numberOfStars, page, limit },
    }
  );
  return response.data;
};
