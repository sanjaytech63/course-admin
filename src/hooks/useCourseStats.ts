import { useState, useEffect } from "react";
import { getCourseStats } from "../api/course.service";
import { handleError } from "../utils/toastHandler";

interface CourseStats {
  overview: {
    totalCourses: number;
    activeCourses: number;
    featuredCourses: number;
    totalStudents: number;
    totalRevenue: number;
    avgRating: number;
    avgPrice: number;
    categoriesCount: number;
  };
  byCategory: Array<{
    _id: string;
    courseCount: number;
    avgRating: number;
    avgPrice: number;
    totalStudents: number;
  }>;
}

export const useCourseStats = () => {
  const [stats, setStats] = useState<CourseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCourseStats();
      setStats(response.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch course statistics";
      setError(errorMessage);
      handleError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
