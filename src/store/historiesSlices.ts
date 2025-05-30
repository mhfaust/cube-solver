import { create, StateCreator } from "zustand";
import { MoveCode } from "@/utils/moveCodes";
import { CubeFaces } from "@/logic/newCube";
import storeSetters from "./storeHelpers";
import { persist } from "zustand/middleware";

export type CubeHistory = {
    initialState: CubeFaces;
    startTime: Date;
    // moves: MoveCode[];  
    // todo: refactor moves to:
    moves: {
        moveCode: MoveCode;
        moveTime: number;
    }[]
}

export type HistoriesSlice = {
}

export const usHistoriesStore = create<HistoriesSlice>()(
    persist(
      (set) => {
        const { setValueOf, pushValuesTo, toggleValueOf } = storeSetters(set)
        return {
      }},
      { name: "cubism-logger" }
    )
) 

