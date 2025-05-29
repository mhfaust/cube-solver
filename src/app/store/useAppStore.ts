import { create } from "zustand";
import {
  GameControlsSlice,
  createGameControlsSlice,
} from "./gameControlsSlice";
import { CubeSlice, createCubeSlice } from "./cubeSlice";
import { select } from "./selectors";

export type AppStore = GameControlsSlice & CubeSlice;

export const useAppStore = create<AppStore>()((setState, getState, store) => ({
  ...createGameControlsSlice(setState, getState, store),
  ...createCubeSlice(setState, getState, store),
}));

export default useAppStore;

export const useActions = () => {
  return useAppStore(
    select(
      ({
        startTimer,
        stopTimer,
        setCubeGrid,
        setInitialFaces,
        resetTimer,
        pushHistory,
        popHistory,
        clearHistory,
        executeMove,
        undoLastMove,
      }) => ({
        startTimer,
        stopTimer,
        setCubeGrid,
        setInitialFaces,
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
