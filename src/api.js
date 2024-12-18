import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchAnalysis = async () => {
  const { data } = await API.get("/ai-mentor");
  return data;
};