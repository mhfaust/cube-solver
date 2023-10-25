import { StateCreator } from "zustand";
import { MutableRefObject } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { _012 } from "@/app/utils/grid";
import storeSetters from "./storeHelpers";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

export type CubeModel = {
  wrapperMesh: MutableRefObject<CubeWrapperMesh>,
  intialPosition: [0|1|2, 0|1|2, 0|1|2],
}

export type CubesGrid = CubeModel[][][]

export type CubeSlice = {
  grid: CubesGrid,
  isRotating: MutableRefObject<boolean>,
  setGrid: ((grid: CubesGrid) => void),
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
    setGrid: setValueOf('grid'),
  }
}


  