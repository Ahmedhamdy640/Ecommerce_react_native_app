import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/products";
import { Product } from "../types/ProductType";
import axios from "axios";

export const useCategory = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => getProductsByCategory("smartphones"),
  });

export const useDeleteCategoryProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, number>({
    mutationFn: async (productId) => {
      const response = await axios.delete(
        `https://dummyjson.com/products/${productId}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
    onSuccess: (data, productId) => {
      queryClient.setQueryData(["categories"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: any) => p.id !== productId),
      }));
    },
  });
};
