import { create } from "zustand";
import { AppState } from "../types";

export const useStore = create<AppState>((set, get) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data = null) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),

  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (course) =>
    set((state) => ({ courses: [...state.courses, course] })),
  updateCourse: (id, updatedCourse) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedCourse } : course,
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),

  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
  updateBlog: (id, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === id ? { ...blog, ...updatedBlog } : blog,
      ),
    })),
  deleteBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== id),
    })),

  stats: {
    totalUsers: 0,
    totalCourses: 0,
    totalBlogs: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  },
  setStats: (stats) => set({ stats }),
}));
