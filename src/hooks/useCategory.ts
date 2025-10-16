import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/products";

export const useCategory = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => getProductsByCategory("smartphones"),
  });
