import { create } from 'zustand';

export const useBotStore = create((set) => ({
  activeBotInstance: {
    typeOfBot: 'none',
    instance: null,
  },

  setBotInstance: (type, instance) =>
    set((state) => {
      return {
        activeBotInstance: {
          typeOfBot: type,
          instance: instance,
        },
      };
    }),
}));
