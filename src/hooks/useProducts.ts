import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/products";
import { Product } from "../types/ProductType";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getProducts
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, number>({
    mutationFn: productsApi.deleteProduct,
    onSuccess: (data, productId) => {
      queryClient.setQueryData(["products"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: any) => p.id !== productId)
      }));
    }
  });
};
