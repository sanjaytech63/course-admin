import { useEffect, useState, useCallback, useRef } from "react";
import { getBlogs } from "../api/blogService";
import { useDebounce } from "./useDebounce";
import { Blog } from "../types";
import { BlogFilters } from "../types/blog.types";

interface UseFetchBlogsReturn {
  blogsData: Blog[];
  blogLoading: boolean;
  fetchErrors: string | null;
  refetch: (filters?: any) => Promise<void>;
  pagination: any | null;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useFetchBlogs = (
  initialFilters: any = {},
): UseFetchBlogsReturn => {
  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [fetchErrors, setFetchErrors] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any | null>(null);
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 9,
    ...initialFilters,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchBlogs = useCallback(
    async (customFilters?: any) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        setBlogLoading(true);
        setFetchErrors(null);

        const currentFilters = customFilters || filters;
        const response = await getBlogs({
          ...currentFilters,
          search: debouncedSearch || currentFilters.search,
        });

        let blogs: Blog[] = [];
        let paginationData = null;

        if (response.data) {
          blogs = response.data.data || response.data || [];
          paginationData = response.data.pagination || {
            currentPage: response.data.page || currentFilters.page || 1,
            totalPages: response.data.totalPages || 1,
            totalItems: response.data.total || 0,
            itemsPerPage: response.data.limit || currentFilters.limit || 9,
            hasNext:
              (response.data.page || 1) < (response.data.totalPages || 1),
            hasPrev: (response.data.page || 1) > 1,
            nextPage:
              (response.data.page || 1) < (response.data.totalPages || 1)
                ? (response.data.page || 1) + 1
                : null,
            prevPage:
              (response.data.page || 1) > 1
                ? (response.data.page || 1) - 1
                : null,
          };
        } else {
          blogs = response.data || response || [];
          paginationData = response.pagination || {
            currentPage: response.page || currentFilters.page || 1,
            totalPages: response.totalPages || 1,
            totalItems: response.total || 0,
            itemsPerPage: response.limit || currentFilters.limit || 9,
            hasNext: (response.page || 1) < (response.totalPages || 1),
            hasPrev: (response.page || 1) > 1,
          };
        }

        setBlogsData(blogs);
        setPagination(paginationData);

        if (!customFilters && paginationData) {
          setFilters((prev: BlogFilters) => ({
            ...prev,
            page: paginationData.currentPage,
          }));
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;

        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while fetching blogs";
        setFetchErrors(errorMessage);
        console.error("Error fetching blogs:", err);
      } finally {
        setBlogLoading(false);
      }
    },
    [filters, debouncedSearch],
  );

  useEffect(() => {
    fetchBlogs();
  }, [filters.page, filters.limit, filters.category, debouncedSearch]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const hasNextPage = pagination ? pagination.hasNext : false;
  const hasPrevPage = pagination ? pagination.hasPrev : false;

  return {
    blogsData,
    blogLoading,
    fetchErrors,
    refetch: fetchBlogs,
    pagination,
    filters,
    setFilters,
    hasNextPage,
    hasPrevPage,
  };
};
