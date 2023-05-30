import {create} from 'zustand';
import { getStorageItem, setStorageItem } from '../../localStorage.js';

interface BotStore {
  token: string;
}

export const useBotStore = create((set) => ({
  token: getStorageItem('token') ? getStorageItem('token') : null,
  setToken: (newToken: string) => set({ token: newToken }),
  removeToken: () => set({ token: null }),
}));
