import { create } from "zustand";
import { GameControlsSlice, PlayMode, createGameControlsSlice } from "./gameControlsSlice";
import { LoggerSlice, createLoggerSlice } from "./loggerSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";
import { ThemeSlice, createThemeSlice } from "./themeSlice";


type AppStore = LoggerSlice & GameControlsSlice & CubeSlice & ThemeSlice

const useAppStore = create<AppStore>()(
  (setState, getState, store) => ({
    ...createLoggerSlice(setState, getState, store),
    ...createGameControlsSlice(setState, getState, store),
    ...createCubeSlice(setState, getState, store),
    ...createThemeSlice(setState, getState, store),
  })
)

export default useAppStore

const select = <T>(fn: (store: AppStore) => T) => fn

const selectProp = <TK extends keyof AppStore>(prop: TK) => {
  return (store: AppStore) => store[prop]
}

export const useMessages = () => useAppStore(selectProp('messages'))
export const useIsLogOpen = () => useAppStore(selectProp('logIsOpen'))
export const useStartTime = () => useAppStore(selectProp('startTime'))
export const useIsSolved = () => useAppStore(selectProp('isSolved'))
export const useGridModel = () => useAppStore(selectProp('grid'))
export const useIsRotating = () => useAppStore(selectProp('isRotating'))
export const useFingersOn = () => useAppStore(selectProp('fingersOn'))
export const useThemeName = () => useAppStore(selectProp('themeName'))

export const usePlayMode = () => {
  return useAppStore(({ startTime, completionTime }) => {
    return startTime && completionTime 
      ? 'complete' 
      : startTime ? 'in-play' : 'casual'
  })
}

export const useActions = () => {
  return useAppStore(select(
    ({ log, toggleLog, startTimer, stopTimer, setGrid, setFingersOn, setThemeName }) => 
    ({ log, toggleLog, startTimer, stopTimer, setGrid, setFingersOn, setThemeName })
  ))
}