import { postRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

const unwrap = async (promise) => {
  const result = await promise;
  return result && result.data ? result.data : result;
};

export const createCategory = (data) =>
  unwrap(postRequest(`${API_URL}/categories`, data));

export const createProduct = (data) =>
  unwrap(postRequest(`${API_URL}/products`, data));

export const createEnquiry = (data) =>
  unwrap(postRequest(`${API_URL}/enquiries`, data));

export const createSubcategory = (data) =>
  unwrap(postRequest(`${API_URL}/subcategories`, data));

export const createFranchiseLocation = (data) =>
  unwrap(postRequest(`${API_URL}/franchise-locations`, data));

export const createFranchiseProductEnquiry = (formData) =>
  unwrap(postRequest(`${API_URL}/enquiries`, formData));