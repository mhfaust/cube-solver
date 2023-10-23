import { StateCreator } from "zustand";
import storeSetters from "./storeHelpers";

export type LoggerSlice = {
  messages: string[];
  logIsOpen: boolean;
  fingersOn: number;
  log: (...msg: string[]) => void;
  toggleLog: () => void;
  setFingersOn: (n: number) => void;
}

export const createLoggerSlice: StateCreator<LoggerSlice> = (set) => { 

  const { setValueOf, pushValuesTo, toggleValueOf } = storeSetters(set)

  return {
    messages: [],
    log: pushValuesTo('messages'),

    logIsOpen: false,
    toggleLog: toggleValueOf('logIsOpen'),

    fingersOn: 0,
    setFingersOn: setValueOf('fingersOn')
  }
}