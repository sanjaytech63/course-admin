import axiosInstance from './axiosInstance';

export interface BlogData {
  title: string;
  author: string;
  category: string;
  content: string;
  status?: 'draft' | 'published';
  images?: File[];
}

export const getBlogs = async () => {
  const response = await axiosInstance.get('/blogs');
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data: BlogData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'images' && value) {
      (value as File[]).forEach((file) => formData.append('images', file));
    } else {
      formData.append(key, value as string);
    }
  });
  const response = await axiosInstance.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateBlog = async (id: string, data: BlogData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'images' && value) {
      (value as File[]).forEach((file) => formData.append('images', file));
    } else {
      formData.append(key, value as string);
    }
  });
  const response = await axiosInstance.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBlogById = async (id: string) => {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response.data;
};
