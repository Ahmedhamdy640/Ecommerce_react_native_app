import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import axios from "axios";
import { Product } from "../types/ProductType";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, number>({
    mutationFn: async (productId: number) => {
      const response = await axios.delete(
        `https://dummyjson.com/products/${productId}`
      );
      return response.data;
    },
    onSuccess: (data, productId) => {
      queryClient.setQueryData(["products"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: any) => p.id !== productId),
      }));
    },
  });
};
