import { StateCreator } from "zustand";
import { MutableRefObject, RefObject, createRef } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { _012 } from "../utils/grid";
import storeSetters from "./storeHelpers";
import { Theme, ThemeName } from "../themes/useTheme";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

export type CubeModel = {
  wrapperMesh: MutableRefObject<CubeWrapperMesh>,
  intialPosition: [0|1|2, 0|1|2, 0|1|2],
}

export type CubesGrid = CubeModel[][][]

export type CubeSlice = {
  grid: CubesGrid,
  isRotating: MutableRefObject<boolean>,
  // controls: GridModel,
  setGrid: ((grid: CubesGrid) => void),
  themeName: ThemeName,
  setThemeName: (name: ThemeName) => void,
}  

export const createCubeSlice: StateCreator<CubeSlice> = (set) =>{ 
  const { setValueOf } = storeSetters(set)

  return {
    grid: _012.map(
      (i: 0|1|2) => _012.map(
        (j: 0|1|2) => _012.map(
          (k: 0|1|2) => ({
            wrapperMesh: { current: {} as Mesh },
            intialPosition: [i,j,k]
          })
        )
      )
    ),
    isRotating: { current: false },
    // controls: createRef(),
    setGrid: setValueOf('grid'),
    themeName: 'bright',
    setThemeName: setValueOf('themeName')
  }
}


  