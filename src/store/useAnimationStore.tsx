import { create } from 'zustand';

interface AnimationStore {
  showAnimation: boolean;
  toggleAnimation: () => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  showAnimation: false,
  toggleAnimation: () => set((state) => ({ showAnimation: !state.showAnimation })),
}));