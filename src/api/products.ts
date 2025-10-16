import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://dummyjson.com/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  const { data } = await productsApi.get("/");
  return data;
};
