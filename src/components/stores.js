import create from "zustand";

export const userStore = create((set) => ({
  isInit: false,
  user: {
    firstName: "loading..",
    lastName: "loading..",
    role: "user",
  },
  setUser: (user) => set({ user }),
  setIsInit: (isInit) => set({ isInit }),
}));

export const settingStore = create((set) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
}));
