import { StateCreator } from "zustand";
import storeSetters from "./storeHelpers";

export type GameControlsSlice = {
  isSolved: boolean;
  startTime: number | null;
  startTimer: () => void;
  stopTimer: () => void;
}

export const createGameControlsSlice: StateCreator<GameControlsSlice> = (set) =>{
  const { setValueUsing } = storeSetters(set)
  return  {
    isSolved: true,
    startTime: null,
    startTimer: setValueUsing('startTime', () => Date.now()),
    // startTimer: () => {
    //   set(() => ({ startTime: Date.now() }))
    // },
    stopTimer: () => {
      set(() => ({ startTime: null }))
    }
  }
}