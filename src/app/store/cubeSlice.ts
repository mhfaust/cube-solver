import { StateCreator } from "zustand";
import { MutableRefObject, RefObject, createRef } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { _012 } from "../utils/grid";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

// export type Cube = CubeWrapperMesh
export type Cube = {
  wrapperMesh: MutableRefObject<CubeWrapperMesh>,
  intialPosition: [0|1|2, 0|1|2, 0|1|2],
}

export type GridModel = Cube[][][]

export type CubeSlice = {
  grid: Cube[][][],
  isRotating: MutableRefObject<boolean>,
  // controls: GridModel,
  setGrid: ((grid: GridModel) => void),
}  

export const createCubeSlice: StateCreator<CubeSlice> = (set) =>({
  //3D array of references:
  grid: _012.map(
    (i: 0|1|2) => _012.map(
      (j: 0|1|2) => _012.map(
        (k: 0|1|2) => ({
          wrapperMesh: { current: {} as Mesh},
          intialPosition: [i,j,k]
        })
      )
    )
  ),
  isRotating: { current: false },
  // controls: createRef(),
  setGrid: (grid: GridModel) => {
    set(() => ({ grid }))
  }
})


  