import create from "zustand";

export const userStore = create((set) => ({
  isInit: false,
  user: {
    firstName: "loading..",
    lastName: "loading..",
    role: "user",
    isAuthenticated: false,
    isPlanActive: false,
  },
  setUser: (user) => set({ user }),
  setIsInit: (isInit) => set({ isInit }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export const settingStore = create((set) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
}));
