import { create } from "zustand";
import { GameControlsSlice, PlayMode, createGameControlsSlice } from "./gameControlsSlice";
import { LoggerSlice, createLoggerSlice } from "./loggerSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";
import { ThemeSlice, createThemeSlice } from "./themeSlice";
import { select } from "./selectors";


export type AppStore = LoggerSlice & GameControlsSlice & CubeSlice & ThemeSlice

export const useAppStore = create<AppStore>()(
  (setState, getState, store) => ({
    ...createLoggerSlice(setState, getState, store),
    ...createGameControlsSlice(setState, getState, store),
    ...createCubeSlice(setState, getState, store),
    ...createThemeSlice(setState, getState, store),
  })
)

export default useAppStore

const makeActionsSelector = (actions: (keyof AppStore)[]) => {
  
}

export const useActions = () => {
  return useAppStore(select(
    ({ 
      log, 
      toggleLog, 
      startTimer, 
      stopTimer, 
      setCubeGrid,
      setFaces,
      setFingersOn, 
      setThemeName,
      resetTimer,
      pushHistory,
      popHistory,
      clearHistory,
      executeMove,
      undoLastMove
    }) => 
    ({ 
      log, 
      toggleLog, 
      startTimer, 
      stopTimer, 
      setCubeGrid,
      setFaces,
      setFingersOn, 
      setThemeName,
      resetTimer,
      pushHistory,
      popHistory,
      clearHistory,
      executeMove,
      undoLastMove
    })
  ))
}