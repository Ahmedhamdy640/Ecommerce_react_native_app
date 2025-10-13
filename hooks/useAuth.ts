import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export const useAuth = (username: string, password: string) => {
  const response = useQuery({
    queryKey: ["auth"],
    queryFn: () => authApi.post("/login", { username, password }),
  });

  return response;
};
