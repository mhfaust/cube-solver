import { create } from "zustand";
import { GameControlsSlice, createGameControlsSlice } from "./gameControlsSlice";
import { LoggerSlice, createLoggerSlice } from "./loggerSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";


type AppStore = LoggerSlice & GameControlsSlice & CubeSlice

const useAppStore = create<AppStore>()(
  (setState, getState, store) => ({
    ...createLoggerSlice(setState, getState, store),
    ...createGameControlsSlice(setState, getState, store),
    ...createCubeSlice(setState, getState, store)
  })
)

export default useAppStore


const select = <T>(fn: (store: AppStore) => T) => fn

export const messagesSelector = select(s => s.messages)
export const isOpenSelector = select(s => s.logIsOpen)
export const startTimeSelector = select(s => s.startTime)
export const isSolvedSelector = select(s => s.isSolved)
export const gridModelSelector = select(s => s.grid)
export const isRotatingSelector = select(s => s.isRotating)
export const fingersOnSelector = select(s => s.fingersOn)
export const themeNameSelector = select(s => s.themeName)
// export const controlsSelector = select(s => s.controls)

export const actionsSelector = select(
  ({ log, toggleLog, startTimer, stopTimer, setGrid, setFingersOn, setThemeName }) => 
  ({ log, toggleLog, startTimer, stopTimer, setGrid, setFingersOn, setThemeName })
)

export const setGridSelector = select(s => s.setGrid)