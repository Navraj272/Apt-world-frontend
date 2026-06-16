'use client';
import { getRequest } from './axios';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const getAllCategories = (payload) =>
  getRequest(`${API_URL}/categories`, payload);

export const getAllProducts = (payload) =>
  getRequest(`${API_URL}/products`, payload);

export const getEnquiryList = (payload) =>
  getRequest(`${API_URL}/enquiries`, payload);