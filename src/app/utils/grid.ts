import { Object3D } from "three";
import { CubeGrid } from "@/app/store/cubeSlice";

export const _012 = [0,1,2] as const

// Given an Object3D reference for a singe-block of the cube,
// Determine its position in the cube grid by iterating through the grid.
// until we find the matching Object3D reference, and return its position as a tuple of three indices.


/**
 * Retrieves the position of a single-block within a 3x3x3 CubeGrid from the block's Object3D reference.
 *
 * @param cubeGrid - A 3-dimensional array representing the cube grid. Each element contains a `wrapperMesh`
 *               with a `current` property that holds the children objects.
 * @param blockContainer - The `Object3D` single-block instance to locate within the grid.
 * @returns A tuple of indices `[i, j, k]` representing the position of the cube in the grid,
 *          where each index is constrained to the values 0, 1, or 2. Returns `undefined` if the
 *          container is not found in the grid.
 */
export const getBlockPosition = (cubeGrid: CubeGrid, blockContainer: Object3D): [0|1|2, 0|1|2, 0|1|2] | undefined => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if(cubeGrid[i][j][k].current?.children[0] === blockContainer) {
          return [i as 0|1|2, j as 0|1|2 ,k as 0|1|2]
        }
      }
    }
  }
}