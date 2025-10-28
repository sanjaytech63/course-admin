import api from './axiosInstance';

export interface SubscribeParams {
  search?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export const subscribeApi = {
  // Subscribe user
  subscribe: async (email: string, source?: string): Promise<{ 
    success: boolean; 
    message: string 
  }> => {
    const response = await api.post('/subscribe', { email, source });
    return response.data;
  },

  // Get subscribers with filters and pagination
  getSubscribers: async (params: SubscribeParams = {}): Promise<any> => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const response = await api.get(`/subscribe?${queryParams}`);
    return response.data;
  },

  // Unsubscribe user
  unsubscribeUser: async (email: string): Promise<{ 
    success: boolean; 
    message: string 
  }> => {
    const response = await api.delete('/subscribe', { data: { email } });
    return response.data;
  },

  // Export subscribers
  exportSubscribers: async (): Promise<string> => {
    const response = await api.get('/subscribe/export', {
      responseType: 'blob'
    });
    return response.data;
  },

  // Get subscription stats
  getStats: async (): Promise<any> => {
    const response = await api.get('/subscribe/stats');
    return response.data;
  }
};