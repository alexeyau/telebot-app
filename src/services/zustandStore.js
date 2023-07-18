import { create } from 'zustand';

const useBotStore = create((set) => ({
  botInstance: {
    setQuestions() {
      console.log('not a choose');
    },
    getQuestions() {
      console.log('not a choose');
    },
  },

  setBotInstance: (data) => set((state) => (state.botInstance = data)),
}));

export default useBotStore;
