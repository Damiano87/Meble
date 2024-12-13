import apiRequest from "../api/apiRequest";
import { LoaderFunctionArgs } from "react-router";

export const getProductsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  // params
  const search = params.get("q");
  const sort = params.get("sort");
  const category = params.get("category");

  try {
    const response = await apiRequest("/products", {
      params: {
        search: search || undefined,
        sort: sort || undefined,
        category: category || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCombinedLoader = async () => {
  try {
    const [topEight, trendyProducts] = await Promise.all([
      apiRequest("/products/top-eight"),
      apiRequest("/products/trendy"),
    ]);

    return {
      topEight: topEight.data,
      trendyProducts: trendyProducts.data,
    };
  } catch (error) {
    console.log(error);
    return {
      topEight: [],
      trendyProducts: [],
    };
  }
};
