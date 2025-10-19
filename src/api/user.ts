import { User } from "../types/UserType";
import { storage, StorageKey } from "../utils/storage";
import { axiosClient } from "./axiosClient";

export const userApi = {
  getMe: async () => {
    const accessToken = await storage.getItem(StorageKey.TOKEN);
    const response = await axiosClient.get<User>("user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }
};
