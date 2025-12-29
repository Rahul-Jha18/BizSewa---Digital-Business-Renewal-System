// src/services/businessApi.js
import api from "./api";

export async function createBusiness(data) {
  const res = await api.post("/business", data);
  return res.data;
}

export async function getMyBusinesses() {
  const res = await api.get("/business/my");
  return res.data;
}
export const createBusiness = (formData) =>
  api.post("/api/business", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });