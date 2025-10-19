import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { currentUserData } from "../store/authSlice";
import { User } from "../types/UserType";
import { userApi } from "../api/user";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: authApi.login
  });

  return mutation;
};

export const useCurrentUser = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const query = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: userApi.getMe,
    enabled: !!accessToken
  });

  useEffect(() => {
    if (query.data) {
      dispatch(currentUserData(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
