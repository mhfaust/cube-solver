import { create, StateCreator } from "zustand";
import storeSetters from "./storeHelpers";
import { persist } from "zustand/middleware";

export type LoggerSlice = {
  messages: string[];
  logIsOpen: boolean;
  fingersOn: number;
  log: (...msg: string[]) => void;
  toggleLog: () => void;
  setFingersOn: (n: number) => void;
}

export const useLoggerStore = create<LoggerSlice>()(
    persist(
      (set) => {
        const { setValueOf, pushValuesTo, toggleValueOf } = storeSetters(set)
        return {
          messages: [],
          log: pushValuesTo('messages'),
          logIsOpen: false,
          toggleLog: toggleValueOf('logIsOpen'),
          fingersOn: 0,
          setFingersOn: setValueOf('fingersOn')
      }},
      { name: "cubism-logger" }
    )
) 

