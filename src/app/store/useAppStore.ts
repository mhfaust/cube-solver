import { StateCreator, create } from "zustand";
import { GameControlSlice, createGameControllerSlice } from "./gameControlSlice";
import { LoggerSlice, createLoggerSlice } from "./loggerSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";


type AppStore = LoggerSlice & GameControlSlice & CubeSlice

const useAppStore = create<AppStore>()(
  (setState, getState, store) => ({
    ...createLoggerSlice(setState, getState, store),
    ...createGameControllerSlice(setState, getState, store),
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
// export const controlsSelector = select(s => s.controls)

export const actionsSelector = select(
  ({ log, toggleLog, startTimer, stopTimer, setGrid }) => 
  ({ log, toggleLog, startTimer, stopTimer, setGrid })
)

export const setGridSelector = select(s => s.setGrid)