import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutUser } from '../api/authService';

interface AuthState {
    user: any | null;
    accessToken: string | null;
    refreshToken: string | null;
    setUser: (user: any) => void;
    setTokens: (access: string, refresh: string) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            setUser: user => set({ user }),
            setTokens: (access: string, refresh: string | null = null) =>
                set({ accessToken: access, refreshToken: refresh }),
            logout: async () => {
                try {
                    await logoutUser();
                } catch (err) {
                    console.error('Error logging out:', err);
                } finally {
                    set({ user: null, accessToken: null, refreshToken: null });
                }
            },
        }),
        { name: 'auth-storage' }
    )
);
