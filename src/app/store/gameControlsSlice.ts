import { create } from "zustand";
import storeSetters from "./storeHelpers";
import { persist } from "zustand/middleware";

export type GameControlsSlice = {
  startTime: number | null
  completionTime: number | null
  startTimer: () => void;
  stopTimer: (isComplete: boolean) => void;
  resetTimer: () => void;
}

export type PlayMode = 'casual' | 'in-play' | 'complete'

export const useGameControlsStore = create<GameControlsSlice>()(
    persist(
    (set) => {
      const { setValueUsing } = storeSetters(set)
      return {
        startTime: null,
        completionTime: null,
        startTimer: setValueUsing('startTime', () => Date.now()),
        stopTimer: (isComplete: boolean = false) => {
          set(() => ({ 
            ...!isComplete && { startTime: null }, 
            completionTime: isComplete ? Date.now() : null
          }))
        },
        resetTimer: () => {
          set(() => ({
            startTime: null,
            completionTime: null
          }))
        },
      }
    },
      { name: "cubism-game-controls" }
    )
) 
