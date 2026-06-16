import { postRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const createCategory = (data) =>
  postRequest(`${API_URL}/categories`, data);

export const createProduct = (data) =>
  postRequest(`${API_URL}/products`, data);