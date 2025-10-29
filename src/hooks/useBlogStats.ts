import { useState, useEffect } from "react";
import { getBlogStats } from "../api/blogService";
import { handleError } from "../utils/toastHandler";

interface BlogStats {
  categories: Array<{
    category: string;
    count: number;
  }>;
  overview: {
    totalBlogs: number;
    featuredBlogs: number;
  };
}

export const useBlogStats = () => {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBlogStats();
      setStats(response.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch blog statistics";
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
