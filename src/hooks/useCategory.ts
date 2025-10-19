import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/ProductType";
import { productsApi } from "../api/products";

export const useCategory = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => productsApi.getProductsByCategory("smartphones")
  });

export const useDeleteCategoryProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, number>({
    mutationFn: productsApi.deleteProduct,
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
    onSuccess: (data, productId) => {
      queryClient.setQueryData(["categories"], (oldData: any) => ({
        ...oldData,
        products: oldData.products.filter((p: any) => p.id !== productId)
      }));
    }
  });
};
