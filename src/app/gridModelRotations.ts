import { MutableRefObject } from "react";
import { Mesh } from "three";

function copyModel<T> (grid: T[][][]) {
  return grid.map(dim2 => dim2.map(dim1 => dim1.slice()))
}

type GridModel =  MutableRefObject<Mesh>[][][]

export const rotateModelXPositive = (grid: GridModel, x: 0|1|2) => {
  const newx00 = grid[x][0][2].current
  const newx01 = grid[x][1][2].current
  const newx02 = grid[x][2][2].current
  const newx10 = grid[x][0][1].current
  const newx11 = grid[x][1][1].current
  const newx12 = grid[x][2][1].current
  const newx20 = grid[x][0][0].current
  const newx21 = grid[x][1][0].current
  const newx22 = grid[x][2][0].current

  const newGrid = copyModel(grid)
  newGrid[x][0][0].current = newx00
  newGrid[x][0][1].current = newx01
  newGrid[x][0][2].current = newx02
  newGrid[x][1][0].current = newx10
  newGrid[x][1][1].current = newx11
  newGrid[x][1][2].current = newx12
  newGrid[x][2][0].current = newx20
  newGrid[x][2][1].current = newx21
  newGrid[x][2][2].current = newx22
  
  return newGrid
}

export const rotateModelXNegative = (grid: GridModel, x: 0|1|2) => {
  const newx00 = grid[x][2][0].current
  const newx01 = grid[x][1][0].current
  const newx02 = grid[x][0][0].current
  const newx10 = grid[x][2][1].current
  const newx11 = grid[x][1][1].current
  const newx12 = grid[x][0][1].current
  const newx20 = grid[x][2][2].current
  const newx21 = grid[x][1][2].current
  const newx22 = grid[x][0][2].current

  const newGrid = copyModel(grid)
  newGrid[x][0][0].current = newx00
  newGrid[x][0][1].current = newx01
  newGrid[x][0][2].current = newx02
  newGrid[x][1][0].current = newx10
  newGrid[x][1][1].current = newx11
  newGrid[x][1][2].current = newx12
  newGrid[x][2][0].current = newx20
  newGrid[x][2][1].current = newx21
  newGrid[x][2][2].current = newx22
  
  return newGrid
}

export const rotateModelYPositive = (grid: GridModel, y: 0|1|2) => {
  const new0y0 = grid[2][y][0].current
  const new0y1 = grid[1][y][0].current
  const new0y2 = grid[0][y][0].current
  const new1y0 = grid[2][y][1].current
  const new1y1 = grid[1][y][1].current
  const new1y2 = grid[0][y][1].current
  const new2y0 = grid[2][y][2].current
  const new2y1 = grid[1][y][2].current
  const new2y2 = grid[0][y][2].current

  const newGrid = copyModel(grid)
  newGrid[0][y][0].current = new0y0
  newGrid[0][y][1].current = new0y1
  newGrid[0][y][2].current = new0y2
  newGrid[1][y][0].current = new1y0
  newGrid[1][y][1].current = new1y1
  newGrid[1][y][2].current = new1y2
  newGrid[2][y][0].current = new2y0
  newGrid[2][y][1].current = new2y1
  newGrid[2][y][2].current = new2y2
  
  return newGrid
}

export const rotateModelYNegative = (grid: GridModel, y: 0|1|2) => {
  const new0y0 = grid[0][y][2].current
  const new0y1 = grid[1][y][2].current
  const new0y2 = grid[2][y][2].current
  const new1y0 = grid[0][y][1].current
  const new1y1 = grid[1][y][1].current
  const new1y2 = grid[2][y][1].current
  const new2y0 = grid[0][y][0].current
  const new2y1 = grid[1][y][0].current
  const new2y2 = grid[2][y][0].current

  const newGrid = copyModel(grid)
  newGrid[0][y][0].current = new0y0
  newGrid[0][y][1].current = new0y1
  newGrid[0][y][2].current = new0y2
  newGrid[1][y][0].current = new1y0
  newGrid[1][y][1].current = new1y1
  newGrid[1][y][2].current = new1y2
  newGrid[2][y][0].current = new2y0
  newGrid[2][y][1].current = new2y1
  newGrid[2][y][2].current = new2y2
  
  return newGrid
}

export const rotateModelZPositive = (grid: GridModel, z: 0|1|2) => {
  const new00z = grid[0][2][z].current
  const new01z = grid[1][2][z].current
  const new02z = grid[2][2][z].current
  const new10z = grid[0][1][z].current
  const new11z = grid[1][1][z].current
  const new12z = grid[2][1][z].current
  const new20z = grid[0][0][z].current
  const new21z = grid[1][0][z].current
  const new22z = grid[2][0][z].current

  const newGrid = copyModel(grid)
  newGrid[0][0][z].current = new00z
  newGrid[0][1][z].current = new01z
  newGrid[0][2][z].current = new02z
  newGrid[1][0][z].current = new10z
  newGrid[1][1][z].current = new11z
  newGrid[1][2][z].current = new12z
  newGrid[2][0][z].current = new20z
  newGrid[2][1][z].current = new21z
  newGrid[2][2][z].current = new22z
  
  return newGrid
}

export const rotateModelZNegative = (grid: GridModel, z: 0|1|2) => {
  const new00z = grid[2][0][z].current
  const new01z = grid[1][0][z].current
  const new02z = grid[0][0][z].current
  const new10z = grid[2][1][z].current
  const new11z = grid[1][1][z].current
  const new12z = grid[0][1][z].current
  const new20z = grid[2][2][z].current
  const new21z = grid[1][2][z].current
  const new22z = grid[0][2][z].current

  const newGrid = copyModel(grid)
  newGrid[0][0][z].current = new00z
  newGrid[0][1][z].current = new01z
  newGrid[0][2][z].current = new02z
  newGrid[1][0][z].current = new10z
  newGrid[1][1][z].current = new11z
  newGrid[1][2][z].current = new12z
  newGrid[2][0][z].current = new20z
  newGrid[2][1][z].current = new21z
  newGrid[2][2][z].current = new22z
  
  return newGrid
}