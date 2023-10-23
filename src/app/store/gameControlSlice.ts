import { StateCreator } from "zustand";
import storeHelpers from "./storeHelpers";

export type GameControlSlice = {
  isSolved: boolean;
  startTime: number | null;
  startTimer: () => void;
  stopTimer: () => void;
}

export const createGameControllerSlice: StateCreator<GameControlSlice> = (set) =>{
  const { setValueUsing } = storeHelpers(set)
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