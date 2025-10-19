import axios from "axios";

export const BASE_URL = "https://dummyjson.com";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
