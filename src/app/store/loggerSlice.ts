import { StateCreator } from "zustand";
import storeHelpers from "./storeHelpers";

export type LoggerSlice = {
  messages: string[];
  logIsOpen: boolean;
  fingersOn: number;
  log: (...msg: string[]) => void;
  toggleLog: () => void;
  setFingersOn: (n: number) => void;
}

export const createLoggerSlice: StateCreator<LoggerSlice> = (set) => { 

  const { setValueOf, pushValuesTo, toggleValueOf } = storeHelpers(set)

  return {
    messages: [],
    log: pushValuesTo('messages'),

    logIsOpen: false,
    toggleLog: toggleValueOf('logIsOpen'),

    fingersOn: 0,
    setFingersOn: setValueOf('fingersOn')
  }
}