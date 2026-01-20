import { getToken } from "./auth";
import API from "../api/auth";

export const searchClients = async (q) => {
  const token = getToken();

  const res = await API.get(`/clients/search`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: { q },
  });

  return res.data;
};
