import api from "./axiosInstance";
import { Course, CourseFilters } from "../types/course.types";

interface GetCoursesOptions {
  signal?: AbortSignal;
}

export const getCourses = async (
  filters: CourseFilters = {},
  options: GetCoursesOptions = {},
): Promise<any> => {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.level) params.append("level", filters.level);
  if (filters.isFeatured !== undefined)
    params.append("featured", filters.isFeatured.toString());
  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice.toString());
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

  const config = {
    params,
    ...options,
  };

  const response = await api.get(`/courses?${params.toString()}`, config);
  return response.data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

export const createCourse = async (
  formData: FormData,
): Promise<{ data: Course; message: string }> => {
  const response = await api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 30000,
  });
  return response.data;
};

export const updateCourse = async (
  id: string,
  formData: FormData,
): Promise<{ data: Course; message: string }> => {
  const response = await api.put(`/courses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 30000,
  });
  return response.data;
};

export const deleteCourseById = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const getCourseStats = async (): Promise<any> => {
  const response = await api.get("/courses/stats");
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get("/courses/categories");
  return response.data.data;
};

export const getFeaturedCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses/featured");
  return response.data.data;
};

export const getDiscountedCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses/discounted");
  return response.data.data;
};

export const updateCourseStatus = async (
  id: string,
  isActive: boolean,
): Promise<{ message: string }> => {
  const response = await api.patch(`/courses/${id}/status`, { isActive });
  return response.data;
};

export const updateCourseFeatured = async (
  id: string,
  isFeatured: boolean,
): Promise<{ message: string }> => {
  const response = await api.patch(`/courses/${id}/featured`, { isFeatured });
  return response.data;
};
