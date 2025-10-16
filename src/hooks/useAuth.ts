import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";

interface Credentials {
  username: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }: Credentials) => {
      const response = await authApi.post("/login", { username, password });
      return response.data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useCurrentUser = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("https://dummyjson.com/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      // console.log("response current user", response.data);
      return response.data;
    },
    enabled: !!accessToken,
  });
};
