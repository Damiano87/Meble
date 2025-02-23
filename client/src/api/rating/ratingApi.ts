import { type RatersResponse } from "@/utils/types";
import apiRequest from "../apiRequest";
import { type ProductRating } from "@/utils/types";
import { ENDPOINTS } from "../endpoints";

export const createRatingApi = () => ({
  // get product ratings from api
  fetchRatersApi: async (
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
  },

  // get product ratings from api
  productRatingsApi: async (
    productId: string | undefined
  ): Promise<ProductRating> => {
    const response = await apiRequest.get<ProductRating>(
      ENDPOINTS.RATING.GET_PRODUCT_RATINGS(productId as string)
    );
    return response.data;
  },
});
