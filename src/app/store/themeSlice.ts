import { create, StateCreator } from "zustand";
import storeSetters from "./storeHelpers";
import { ThemeName } from "@/app/themes/useThemeAssets";
import { persist } from "zustand/middleware";

export type ThemeSlice = {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
};

export const useThemeStore = create<ThemeSlice>()(
  persist(
    (set, get) => ({
      themeName: "dark",
      setThemeName: (name) => set({ themeName: name }),
    }),
    { name: "cubism-theme" }
  )
);
