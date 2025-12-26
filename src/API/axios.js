import axios from "axios";
const BASE_URL = " https://decomposed-unshepherding-vilma.ngrok-free.dev";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
