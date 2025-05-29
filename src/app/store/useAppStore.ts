import { create } from "zustand";
import {
  GameControlsSlice,
  createGameControlsSlice,
} from "./gameControlsSlice";
import { LoggerSlice, createLoggerSlice } from "./loggerSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";
import { select } from "./selectors";
import { persist } from "zustand/middleware";

export type AppStore = LoggerSlice & GameControlsSlice & CubeSlice;

export const useAppStore = create<AppStore>()((setState, getState, store) => ({
  ...createLoggerSlice(setState, getState, store),
  ...createGameControlsSlice(setState, getState, store),
  ...createCubeSlice(setState, getState, store),
}));

export default useAppStore;

export const useActions = () => {
  return useAppStore(
    select(
      ({
        log,
        toggleLog,
        startTimer,
        stopTimer,
        setCubeGrid,
        setInitialFaces,
        setFingersOn,
        resetTimer,
        pushHistory,
        popHistory,
        clearHistory,
        executeMove,
        undoLastMove,
      }) => ({
        log,
        toggleLog,
        startTimer,
        stopTimer,
        setCubeGrid,
        setInitialFaces,
        setFingersOn,
        resetTimer,
        pushHistory,
        popHistory,
        clearHistory,
        executeMove,
        undoLastMove,
      })
    )
  );
};
