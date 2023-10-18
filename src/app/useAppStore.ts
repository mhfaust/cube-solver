import { StateCreator, create } from "zustand";

type LoggerSlice = {
  messages: string[];
  isOpen: boolean;
  actions: {
    log: (msg: string) => void;
    toggle: () => void;
  }
}

const createLoggerSlice: StateCreator<LoggerSlice> = (set) =>( {
  messages: [],
  isOpen: false,
  actions: {
    log: (msg: string) => {
      set(({ messages }) => ({ messages: [...messages, msg] }))
    },
    toggle: () => {
      set(({ isOpen }) => ( { isOpen: !isOpen }))
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
export const actionsSelector = ({ actions } : AppStore) => actions