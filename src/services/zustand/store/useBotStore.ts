import { create } from 'zustand';

interface BotStore {
  token: string;
}

export const useBotStore = create((set) => ({
  token: null,
  setToken: (newToken: string) => set({ token: newToken }),
  removeToken: () => set({ token: null }),
}));
