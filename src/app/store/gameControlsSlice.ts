import { StateCreator } from "zustand";
import storeSetters from "./storeHelpers";

export type GameControlsSlice = {
  isSolved: boolean;
  startTime: number | null;
  completionTime: number | null;
  startTimer: () => void;
  stopTimer: (isComplete: boolean) => void;
}

export const createGameControlsSlice: StateCreator<GameControlsSlice> = (set) =>{
  const { setValueUsing } = storeSetters(set)
  return  {
    isSolved: true,
    startTime: null,
    completionTime: null,
    startTimer: setValueUsing('startTime', () => Date.now()),
    stopTimer: (isComplete: boolean = false) => {
      set(() => ({ 
        startTime: null, 
        completionTime: isComplete ? Date.now() : null
      }))
    }
  }
}