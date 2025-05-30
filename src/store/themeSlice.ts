import { create } from "zustand";
import { ThemeName } from "@/themes/useThemeAssets";
import { persist } from "zustand/middleware";

export type ThemeSlice = {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
};

export const useThemeStore = create<ThemeSlice>()(
  persist(
    (set) => { return ({
      themeName: "dark",
      setThemeName: (name) => set({ themeName: name }),
    })},
    { name: "cubism-theme" }
  )
);
