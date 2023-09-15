import axios from "axios";

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const nextonFetcher = (url: string) =>
  client.get(url).then((res) => res.data);
