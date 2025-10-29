import { useState } from "react";
import { subscribeApi } from "../api/subscribeService";

interface Subscriber {
  _id: string;
  email: string;
  status: "active" | "inactive";
  subscribedAt: string;
  unsubscribedAt?: string;
  source?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseSubscribersReturn {
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  fetchSubscribers: (
    search?: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  unsubscribeUser: (email: string, id: string) => Promise<void>;
  bulkUnsubscribe: (ids: string[]) => Promise<void>;
  exportSubscribers: () => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useSubscribers = (): UseSubscribersReturn => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchSubscribers = async (
    search: string = "",
    page: number = pagination.page,
    limit: number = pagination.limit,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await subscribeApi.getSubscribers({
        search,
        page,
        limit,
      });
      setSubscribers(response.subscribers);
      setPagination((prev) => ({
        ...prev,
        page: response.page || page,
        total: response.total || 0,
        totalPages:
          response.totalPages || Math.ceil((response.total || 0) / limit),
      }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscribers");
      console.error("Error fetching subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchSubscribers("", page, pagination.limit);
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
    fetchSubscribers("", 1, limit);
  };

  const unsubscribeUser = async (email: string, id: string): Promise<void> => {
    try {
      await subscribeApi.unsubscribeUser(email);
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub._id === id
            ? {
                ...sub,
                status: "inactive",
                unsubscribedAt: new Date().toISOString(),
              }
            : sub,
        ),
      );
      // Refresh to update counts
      fetchSubscribers("", pagination.page, pagination.limit);
    } catch (err: any) {
      setError(err.message || "Failed to unsubscribe user");
      throw err;
    }
  };

  const bulkUnsubscribe = async (ids: string[]): Promise<void> => {
    try {
      const unsubscribePromises = ids.map((id) => {
        const subscriber = subscribers.find((s) => s._id === id);
        return subscriber
          ? subscribeApi.unsubscribeUser(subscriber.email)
          : Promise.resolve();
      });

      await Promise.all(unsubscribePromises);

      setSubscribers((prev) =>
        prev.map((sub) =>
          ids.includes(sub._id)
            ? {
                ...sub,
                status: "inactive",
                unsubscribedAt: new Date().toISOString(),
              }
            : sub,
        ),
      );
      // Refresh to update counts and clear selection
      fetchSubscribers("", pagination.page, pagination.limit);
    } catch (err: any) {
      setError(err.message || "Failed to unsubscribe selected users");
      throw err;
    }
  };

  const exportSubscribers = async (): Promise<void> => {
    try {
      const csvContent = await subscribeApi.exportSubscribers();
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Failed to export subscribers");
      throw err;
    }
  };

  return {
    subscribers,
    loading,
    error,
    pagination,
    fetchSubscribers,
    unsubscribeUser,
    bulkUnsubscribe,
    exportSubscribers,
    setPage,
    setLimit,
  };
};
