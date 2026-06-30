'use client';
import { getRequest } from './axios';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

const unwrap = async (promise) => {
  const result = await promise;
  return result && result.data ? result.data : result;
};

export const getAllCategories = (payload) =>
  unwrap(getRequest(`${API_URL}/categories`, payload));

export const getAllSubcategories = (payload) =>
  unwrap(getRequest(`${API_URL}/subcategories`, payload));

export const getAllProducts = (payload) =>
  unwrap(getRequest(`${API_URL}/products`, payload));

export const getProduct = (id) =>
  unwrap(getRequest(`${API_URL}/products/${id}`));

export const getEnquiryList = (payload) =>
  unwrap(getRequest(`${API_URL}/enquiries`, payload));

export const getGlobalSettings = () =>
  unwrap(getRequest(`${API_URL}/settings`));