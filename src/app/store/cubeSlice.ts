import { StateCreator } from "zustand";
import { MutableRefObject, RefObject, createRef } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { _012 } from "../utils/grid";

export type Cube = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
export type GridModel = MutableRefObject<Cube>[][][]

export type CubeSlice = {
  grid: MutableRefObject<Mesh>[][][],
  // controls: GridModel,
  setGrid: ((grid: GridModel) => void)
}  

export const createCubeSlice: StateCreator<CubeSlice> = (set) =>({
  grid: _012.map(i => _012.map(j => _012.map(k => ({ current: ({} as Mesh) })))),
  // controls: createRef(),
  setGrid: (grid: GridModel) => {
    set(() => ({ grid }))
  }
})


  