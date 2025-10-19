import { axiosClient } from "./axiosClient";
import { LoginResponse } from "../types/auth";

export type LoginParams = {
  username: string;
  password: string;
};

export const authApi = {
  login: async (params: LoginParams) => {
    const response = await axiosClient.post<LoginResponse>(
      "auth/login",
      params
    );
    return response.data;
  }
};
