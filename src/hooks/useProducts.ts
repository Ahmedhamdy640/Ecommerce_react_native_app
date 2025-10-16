import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { ProductsResponse } from "../types/ProductType";

export const useProducts = () =>
  useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
