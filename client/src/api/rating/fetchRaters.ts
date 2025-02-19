import { type RatersResponse } from "@/utils/types";
import apiRequest from "../apiRequest";
import { ENDPOINTS } from "../endpoints";

// get product ratings from api
export const fetchRatersApi = async (
  productId: string,
  page: string,
  limit: string,
  numberOfStars?: string[]
): Promise<RatersResponse> => {
  const response = await apiRequest.get<RatersResponse>(
    ENDPOINTS.RATING.GET_RATERS(productId),
    {
      params: { numberOfStars, page, limit },
    }
  );
  return response.data;
};
