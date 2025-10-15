import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";

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

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       const response = await authApi.post("/logout");
//       return response.data;
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ["user"] });
//     },
//   });
// };
