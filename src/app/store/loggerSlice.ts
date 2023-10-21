import { StateCreator } from "zustand";

export type LoggerSlice = {
  messages: string[];
  logIsOpen: boolean;
  log: (...msg: string[]) => void;
  toggleLog: () => void;
}

export const createLoggerSlice: StateCreator<LoggerSlice> = (set) =>( {
  messages: [],
  logIsOpen: false,
  log: (...msg: string[]) => {
    set(({ messages }) => ({ messages: [...messages, ...msg] }))
  },
  toggleLog: () => {
    set(({ logIsOpen }) => ( { logIsOpen: !logIsOpen }))
  },
})