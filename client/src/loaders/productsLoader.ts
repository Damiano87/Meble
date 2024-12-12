import apiRequest from "../api/apiRequest";

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
