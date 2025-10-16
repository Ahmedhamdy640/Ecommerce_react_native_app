import axios from "axios";
import { ProductsResponse } from "../types/ProductType";

const productsApi = axios.create({
  baseURL: "https://dummyjson.com/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  const { data } = await productsApi.get<ProductsResponse>("/");
  return data;
};

export const getProductsByCategory = async (category: string) => {
  const { data } = await productsApi.get<ProductsResponse>(
    `/category/${category}`
  );
  return data;
};
