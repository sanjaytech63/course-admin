import api from './axiosInstance';
import { BlogFilters } from '../types/blog.types';
import { Blog } from '../types';

export const getBlogs = async (filters: BlogFilters = {}): Promise<any> => {
  const params = new URLSearchParams();

  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await api.get(`/blogs?${params.toString()}`);
  return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${id}`);
  return response.data.data;
};

export const createBlog = async (formData: FormData): Promise<{ data: Blog; message: string }> => {
  const response = await api.post('/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
  return response.data;
};

export const updateBlog = async (id: string, formData: FormData): Promise<{ data: Blog; message: string }> => {
  const response = await api.put(`/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
  return response.data;
};

export const deleteBlogById = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

export const getBlogStats = async () => {
  const response = await api.get('/blogs/stats/overview');
  return response.data;
};