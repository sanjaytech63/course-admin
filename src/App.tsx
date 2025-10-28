import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/store';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Courses } from './pages/Courses';
import { Blogs } from './pages/Blogs';
import { Settings } from './pages/Settings';
import { Blog, Course } from './types';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkStatusBanner from './components/ui/NetworkStatusBanner';
import SubscribersManagement from './components/SubscribersManagement';
const mockCourses: Course[] = [
  { id: '1', title: 'React Masterclass', description: 'Learn React from scratch', instructor: 'John Doe', category: 'Web Development', price: 99, thumbnail: '/api/placeholder/120/80', status: 'published', students: 1245, rating: 4.8, createdAt: '2023-01-15' },
  { id: '2', title: 'JavaScript Fundamentals', description: 'Master JavaScript basics', instructor: 'Sarah Smith', category: 'Web Development', price: 79, thumbnail: '/api/placeholder/120/80', status: 'published', students: 892, rating: 4.6, createdAt: '2023-02-20' },
];

const mockBlogs: Blog[] = [
  { _id: '1', title: 'Getting Started with React', description: 'Lorem ipsum...', author: 'John Doe', category: 'Technology', status: 'published', createdAt: '2023-04-01', },
  { _id: '2', title: 'JavaScript Best Practices', description: 'Lorem ipsum...', author: 'Sarah Smith', category: 'Education', status: 'draft', createdAt: '2023-04-15', },
];

function App() {
  const { setCourses, setBlogs, setStats, isCollapsed } = useStore();

  useEffect(() => {

    setCourses(mockCourses);
    setBlogs(mockBlogs);
    setStats({
      totalUsers: 2847,
      totalCourses: 156,
      totalBlogs: 324,
      totalRevenue: 45289,
      monthlyGrowth: 12,
    });
  }, [setCourses, setBlogs, setStats]);

  return (
    <>
      {/* Route */}
      <Router>
        <Routes>
          {/* Auth Routes - Without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - With Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/SubscribersManagement" element={<SubscribersManagement />} />
            </Route>
          </Route>
        </Routes>
      </Router>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnFocusLoss />

      {/* NetworkStatusBanner */}
      <NetworkStatusBanner />
    </>
  );
}

export default App;