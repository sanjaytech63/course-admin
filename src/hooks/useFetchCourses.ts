import { useEffect, useState, useCallback, useRef } from 'react';
import { getCourses } from '../api/course.service';
import { useDebounce } from './useDebounce';
import { Course, CourseFilters } from '../types/course.types';

interface UseFetchCoursesReturn {
    courses: Course[];
    loading: boolean;
    error: string | null;
    refetch: (customFilters?: CourseFilters) => Promise<void>;
    pagination: any | null;
    filters: CourseFilters;
    setFilters: React.Dispatch<React.SetStateAction<CourseFilters>>;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export const useFetchCourses = (initialFilters: CourseFilters = {}): UseFetchCoursesReturn => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<any | null>(null);
    const [filters, setFilters] = useState<CourseFilters>({
        page: 1,
        limit: 9,
        ...initialFilters,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const debouncedSearch = useDebounce(filters.search, 500);

    const fetchCourses = useCallback(async (customFilters?: CourseFilters) => {
        // Cancel previous request if it exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            setError(null);

            const currentFilters = customFilters || filters;
            const params = {
                ...currentFilters,
                search: debouncedSearch || currentFilters.search,
            };

            const response = await getCourses(params, {
                signal: abortControllerRef.current.signal
            });

            let coursesData: Course[] = [];
            let paginationData = null;

            // Handle different response structures
            if (response.data) {
                coursesData = response.data.data || response.data.courses || response.data || [];
                paginationData = response.data.pagination || {
                    currentPage: response.data.page || currentFilters.page || 1,
                    totalPages: response.data.totalPages || 1,
                    totalItems: response.data.total || 0,
                    itemsPerPage: response.data.limit || currentFilters.limit || 9,
                    hasNext: (response.data.page || 1) < (response.data.totalPages || 1),
                    hasPrev: (response.data.page || 1) > 1,
                    nextPage: (response.data.page || 1) < (response.data.totalPages || 1) ? (response.data.page || 1) + 1 : null,
                    prevPage: (response.data.page || 1) > 1 ? (response.data.page || 1) - 1 : null,
                };
            } else {
                coursesData = response.courses || response.data || response || [];
                paginationData = response.pagination || response.meta || {
                    currentPage: response.page || currentFilters.page || 1,
                    totalPages: response.totalPages || 1,
                    totalItems: response.total || 0,
                    itemsPerPage: response.limit || currentFilters.limit || 9,
                    hasNext: (response.page || 1) < (response.totalPages || 1),
                    hasPrev: (response.page || 1) > 1,
                };
            }

            setCourses(coursesData);
            setPagination(paginationData);

            // Update filters with actual pagination data if no custom filters provided
            if (!customFilters && paginationData) {
                setFilters((prev: CourseFilters) => ({
                    ...prev,
                    page: paginationData.currentPage,
                }));
            }

        } catch (err: any) {
            // Ignore abort errors
            if (err.name === 'AbortError') return;

            const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong while fetching courses";
            setError(errorMessage);
            console.error('Error fetching courses:', err);
            
            // Clear courses on error
            setCourses([]);
        } finally {
            setLoading(false);
        }
    }, [filters, debouncedSearch]);

    // Fetch courses when filters change
    useEffect(() => {
        fetchCourses();
    }, [filters.page, filters.limit, filters.category, filters.level, debouncedSearch]);

    // Cleanup abort controller on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const hasNextPage = pagination ? pagination.hasNext || pagination.nextPage : false;
    const hasPrevPage = pagination ? pagination.hasPrev || pagination.prevPage : false;

    return {
        courses,
        loading,
        error,
        refetch: fetchCourses,
        pagination,
        filters,
        setFilters,
        hasNextPage,
        hasPrevPage,
    };
};