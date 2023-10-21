import { Object3D } from "three";
import { GridModel } from "../store/cubeSlice";

export const _012 = [0,1,2] as const

export const getCubePosition = (grid: GridModel, container: Object3D): [0|1|2, 0|1|2, 0|1|2] | undefined => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if(grid[i][j][k].wrapperMesh.current?.children[0] === container) {
          return [i as 0|1|2, j as 0|1|2 ,k as 0|1|2]
        }
      }
    }
  }
}