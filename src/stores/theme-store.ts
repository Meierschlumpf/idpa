import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist<TypeDef>(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => set((t) => ({ ...t, theme: theme as ThemeType })),
    }),
    {
      name: 'theme',
      getStorage: () => ({
        // Returning a promise from getItem is necessary to avoid issues with hydration
        getItem: async (name: string) => localStorage.getItem(name),
        setItem: (name: string, value: string) => localStorage.setItem(name, value),
        removeItem: (name: string) => localStorage.removeItem(name),
      }),
    }
  )
);

type ThemeType = 'light' | 'dark';

type TypeDef = {
  theme: ThemeType;
  setTheme: (role: string) => void;
};
