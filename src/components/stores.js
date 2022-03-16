import create from "zustand";

export const userStore = create((set) => ({
  user: null,
  profile: {},
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
