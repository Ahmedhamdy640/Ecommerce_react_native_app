import { ProductsResponse } from "../types/ProductType";
import { axiosClient } from "./axiosClient";

export const productsApi = {
  getProducts: async () => {
    const { data } = await axiosClient.get<ProductsResponse>("products");
    return data;
  },
  getProductsByCategory: async (category: string) => {
    const { data } = await axiosClient.get<ProductsResponse>(
      `products/category/${category}`
    );
    return data;
  },
  deleteProduct: async (productId: number) => {
    const respone = await axiosClient.delete(`products/${productId}`);
    return respone.data;
  }
};
