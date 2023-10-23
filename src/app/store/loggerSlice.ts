import { StateCreator } from "zustand";

export type LoggerSlice = {
  messages: string[];
  logIsOpen: boolean;
  fingersOn: number;
  log: (...msg: string[]) => void;
  toggleLog: () => void;
  setFingersOn: (n: number) => void;
}

type Set<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void

function setterHelpers <T> (set: Set<T>) {

  return ({
    setValueAs: (propName: keyof T) => {
      return (arg: T[typeof propName]) => {
        set(() => ({ [propName]: arg }) as Partial<T>)
      }
    }
  })
}


export const createLoggerSlice: StateCreator<LoggerSlice> = (set) => { 
  const simpleSetter = (propName: keyof LoggerSlice) => {
    return (arg: LoggerSlice[typeof propName]) => {
      set(() => ({ [propName]: arg }))
    }
  }

  const { setValueAs } = setterHelpers(set)

  return {
    messages: [],
    logIsOpen: false,
    fingersOn: 0,
    log: (...msg: string[]) => {
      set(({ messages }) => ({ messages: [...messages, ...msg] }))
    },
    toggleLog: () => {
      set(({ logIsOpen }) => ( { logIsOpen: !logIsOpen }))
    },
    setFingersOn: setValueAs('fingersOn')
  }
}