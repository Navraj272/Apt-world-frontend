'use client';
import { getRequest } from './axios';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const getAllCategories = (payload) =>
  getRequest(`${API_URL}/categories`, payload);

export const getAllSubcategories = (payload) =>
  getRequest(`${API_URL}/subcategories`, payload);

export const getAllProducts = (payload) =>
  getRequest(`${API_URL}/products`, payload);

export const getEnquiryList = (payload) =>
  getRequest(`${API_URL}/enquiries`, payload);

export const getGlobalSettings = () =>
  getRequest(`${API_URL}/settings`);