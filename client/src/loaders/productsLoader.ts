import apiRequest from "../api/apiRequest";

export const getTopEightLoader = async () => {
  try {
    const response = await apiRequest("/products/top-eight");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
