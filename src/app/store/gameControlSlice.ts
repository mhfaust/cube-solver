import { StateCreator } from "zustand";

export type GameControlSlice = {
  isSolved: boolean;
  startTime: number | null;
  startTimer: () => void;
  stopTimer: () => void;
}

export const createGameControllerSlice: StateCreator<GameControlSlice> = (set) =>( {
  isSolved: true,
  startTime: null,
  startTimer: () => {
    set(() => ({ startTime: Date.now() }))
  },
  stopTimer: () => {
    set(() => ({ startTime: null }))
  }
})