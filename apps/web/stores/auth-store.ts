import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  user: { id: string; email: string; name: string } | null;
  setSession: (token: string, user: { id: string; email: string; name: string }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setSession: (token, user) => {
    localStorage.setItem('lavision_access_token', token);
    set({ accessToken: token, user });
  },
  clearSession: () => {
    localStorage.removeItem('lavision_access_token');
    set({ accessToken: null, user: null });
  }
}));
