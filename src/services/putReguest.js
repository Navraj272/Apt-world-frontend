// import { objectToFormData } from '@/lib/utils';
import { putRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const updateCategory = (id, data) => {
  if (typeof id === 'object' && id !== null) {
    const { id: dataId, ...rest } = id;
    return putRequest(`${API_URL}/categories/${dataId}`, rest);
  }
  return putRequest(`${API_URL}/categories/${id}`, data);
};

export const updateProduct = (id, data) => {
  if (typeof id === 'object' && id !== null) {
    const { id: dataId, ...rest } = id;
    return putRequest(`${API_URL}/products/${dataId}`, rest);
  }
  return putRequest(`${API_URL}/products/${id}`, data);
};

export const updateEnquiry = (id, data) => {
  if (typeof id === 'object' && id !== null) {
    const { id: dataId, ...rest } = id;
    return putRequest(`${API_URL}/enquiries/${dataId}`, rest);
  }
  return putRequest(`${API_URL}/enquiries/${id}`, data);
};