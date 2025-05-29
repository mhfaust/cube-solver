import { create } from "zustand";
import { CubeSlice, createCubeSlice } from "./cubeSlice";
import { select } from "./selectors";

export type AppStore =  CubeSlice;

export const useAppStore = create<AppStore>()((setState, getState, store) => ({
  ...createCubeSlice(setState, getState, store),
}));

export default useAppStore;

export const useActions = () => {
  return useAppStore(
    select(
      ({
        setCubeGrid,
        setInitialFaces,
        pushHistory,
        popHistory,
        clearHistory,
        executeMove,
        undoLastMove,
      }) => ({
        setCubeGrid,
        setInitialFaces,
        pushHistory,
        popHistory,
        clearHistory,
        executeMove,
        undoLastMove,
      })
    )
  );
};
