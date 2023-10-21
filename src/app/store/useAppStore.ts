import { StateCreator, create } from "zustand";

type LoggerSlice = {
  messages: string[];
  isOpen: boolean;
  isSolved: boolean;
  startTime: number | null;
  actions: {
    log: (...msg: string[]) => void;
    toggleLog: () => void;
    startTimer: () => void;
    stopTimer: () => void;
  }
}

const createLoggerSlice: StateCreator<LoggerSlice> = (set) =>( {
  messages: [],
  isOpen: false,
  isSolved: true,
  startTime: null,
  actions: {
    log: (...msg: string[]) => {
      set(({ messages }) => ({ messages: [...messages, ...msg] }))
    },
    toggleLog: () => {
      set(({ isOpen }) => ( { isOpen: !isOpen }))
    },
    startTimer: () => {
      set(() => ({ startTime: Date.now() }))
    },
    stopTimer: () => {
      set(() => ({ startTime: null }))
    }
  }
})

export type AppStore = LoggerSlice

const useAppStore = create<AppStore>()(
  (setState, getState, store) => ({
    ...createLoggerSlice(setState, getState, store)
  })
)

export default useAppStore
export const messagesSelector = ({ messages } : AppStore) => messages
export const isOpenSelector = ({ isOpen } : AppStore) => isOpen
export const startTimeSelector = ({ startTime } : AppStore) => startTime
export const isSolvedSelector = ({ isSolved } : AppStore) => isSolved
export const actionsSelector = ({ actions } : AppStore) => actions