import { deleteRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const deleteCategory = (id) =>
  deleteRequest(`${API_URL}/categories/${id}`);

export const deleteSubcategory = (id) =>
  deleteRequest(`${API_URL}/subcategories/${id}`);

export const deleteProduct = (id) =>
  deleteRequest(`${API_URL}/products/${id}`);
