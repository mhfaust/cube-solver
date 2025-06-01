import { create, StateCreator } from "zustand";
import { MoveCode } from "@/utils/moveCodes";
import { CubeFaces } from "@/logic/newCube";
import storeSetters from "./storeHelpers";
import { persist } from "zustand/middleware";
import { ThemeSlice } from "./themeSlice";

export type CubeHistory = {
    id: string;
    initialState: CubeFaces;
    startTime: number;
    duration: number;
    themeName: ThemeSlice['themeName'];
    moves: {
        moveCode: MoveCode;
        moveTime: number;
    }[]
}

export type RecordsSlice = {
  records: CubeHistory[];
  pushRecord: (game: CubeHistory) => void;
}

export const useRecordsStore = create<RecordsSlice>()(
    persist(
      (set) => {
        const { pushValueTo } = storeSetters(set)
        return {
          records: [],
          pushRecord: pushValueTo('records')
      }},
      { 
        name: "cubism-records",
        version: 1        
      }
    )
) 

