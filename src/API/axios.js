import axios from "axios";
const BASE_URL = "https://decomposed-unshepherding-vilma.ngrok-free.dev/";
// const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://snitchier-maeve-shufflingly.ngrok-free.dev";
// s

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});
