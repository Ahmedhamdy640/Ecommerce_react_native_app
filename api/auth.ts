import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://dummyjson.com/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
