import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const login = (data) => {
  return axios.post(`${API}/auth/login`, data);
};
