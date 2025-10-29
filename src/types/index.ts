// import type { Blog, Course, DashboardStats, ModalState, SidebarState, User } from '../types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  status: "active" | "inactive";
  avatar?: string;
  joinDate: string;
}

export interface UserFormData {
  fullName: string;
  password: string;
  email: string;
  userId?: string;
}

export interface UserErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  price: number;
  thumbnail: string;
  status: "published" | "draft" | "archived";
  students: number;
  rating: number;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  image?: string;
  status: "published" | "draft";
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalBlogs: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface SidebarState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export interface ModalState {
  isOpen: boolean;
  data: any;
  openModal: (type: "create" | "edit" | "delete", data?: any) => void;
  closeModal: () => void;
}

export interface AppState extends SidebarState, ModalState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  type: any;

  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;

  stats: DashboardStats;
  setStats: (stats: DashboardStats) => void;
}
