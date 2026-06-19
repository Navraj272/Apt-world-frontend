import { postRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const createCategory = (data) =>
  postRequest(`${API_URL}/categories`, data);

export const createProduct = (data) =>
  postRequest(`${API_URL}/products`, data);

export const createEnquiry = (data) =>
  postRequest(`${API_URL}/enquiries`, data);

export const createSubcategory = (data) =>
  postRequest(`${API_URL}/subcategories`, data);