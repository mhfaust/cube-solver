import { StateCreator } from "zustand";
import storeSetters from "./storeHelpers";
import { ThemeName } from "../themes/useTheme";


export type ThemeSlice = {
  themeName: ThemeName,
  setThemeName: (name: ThemeName) => void,
}  

export const createThemeSlice: StateCreator<ThemeSlice> = (set) =>{ 
  const { setValueOf } = storeSetters(set)

  return {
    themeName: 'light',
    setThemeName: setValueOf('themeName')
  }
}


  