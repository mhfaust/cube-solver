import { StateCreator } from "zustand";
import { MutableRefObject } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Quaternion } from "three";
import { _012 } from "@/app/utils/grid";
import storeSetters from "./storeHelpers";
import { MoveCode } from "../utils/moveCodes";

export type CubeWrapperMesh = Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>

export type SingleBlock = {
  wrapperMesh: MutableRefObject<CubeWrapperMesh>,
  initialPosition: [0|1|2, 0|1|2, 0|1|2],
  orientation: Quaternion,
}

const emptyHistory: MoveCode[] = []


/**
 * Represents a 3D cube structure composed of smaller blocks.
 * 
 * The cube is modeled as a three-dimensional array where:
 * - The first dimension represents the columns within each row (x-axis).
 * - The second dimension represents the rows within each layer (y-axis).
 * - The third dimension represents the layers along the depth (z-axis).
 * 
 * Each element in the 3D array is a `SingleBlock`, which represents an individual block within the cube.
 */
export type CubeGrid = SingleBlock[][][]

export type CubeSlice = {
  cubeGrid: CubeGrid,
  isRotating: MutableRefObject<boolean>,
  setCubeGrid: ((cubeGrid: CubeGrid) => void),
  history: MoveCode[],
  pushHistory: (moveCode: MoveCode) => void,
  popHistory: () => MoveCode | undefined,
  clearHistory: () => void,
}  

export const createCubeSlice: StateCreator<CubeSlice> = (set, get) => { 
  const { setValueOf, pushValueTo, popValueFrom } = storeSetters(set)

  return {
    cubeGrid: _012.map(
      (i: 0|1|2) => _012.map(
        (j: 0|1|2) => _012.map(
          (k: 0|1|2) => ({
            wrapperMesh: { current: {} as Mesh },
            initialPosition: [i,j,k],
            orientation: new Quaternion(0, 0, 0, 1) // Default orientation
          })
        )
      ) 
    ),
    isRotating: { current: false },
    setCubeGrid: setValueOf('cubeGrid'),
    history: emptyHistory,
    pushHistory: pushValueTo('history'),
    popHistory: popValueFrom('history'),
    clearHistory: () => {
      set({ history: emptyHistory })
    }
  }
}


  