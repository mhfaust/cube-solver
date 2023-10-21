import { MutableRefObject } from "react";
import { Mesh, Object3D, Vector3 } from "three";
import { GridModel } from "../store/cubeSlice";

function copyModel<T> (grid: T[][][]) {
  return grid.map(dim2 => dim2.map(dim1 => dim1.slice()))
}


const rotateModelXLayerPositive = (grid: GridModel, x: 0|1|2) => {
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

const rotateModelXLayerNegative: LayerRotator = (grid: GridModel, x: 0|1|2) => {
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

const rotateModelYLayerPositive: LayerRotator = (grid: GridModel, y: 0|1|2) => {
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

const rotateModelYLayerNegative: LayerRotator = (grid: GridModel, y: 0|1|2) => {
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

const rotateModelZLayerPositive: LayerRotator = (grid: GridModel, z: 0|1|2) => {
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

const rotateModelZLayerNegative: LayerRotator = (grid: GridModel, z: 0|1|2) => {
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

type LayerRotator = typeof rotateModelXLayerPositive


function orbit(
  cube: Object3D, 
  axis: Vector3, 
  angle: number,
  callback: () => void,
  animationTime: number
) {
  const rotationSteps = Math.floor(animationTime / 5)
  if (!animationTime) {
    return cube.rotateOnWorldAxis(axis, angle)
  }
  const recurse = (i: number) => {
    setTimeout(() => {
      cube.rotateOnWorldAxis(axis, angle / (rotationSteps))
      if(i < rotationSteps - 1){
        recurse(i + 1)
      } else setTimeout(callback, 1)
    }, animationTime / rotationSteps)
  }
  recurse(0)
}

function layerObjects <T>(model: MutableRefObject<T>[][][], axis: 'x'|'y'|'z', layer: 0|1|2) {
return {
  'x': () => model[layer].flat(),
  'y': () => model.map(i => i[layer]).flat(),
  'z': () => model.map(j => j.map(y => y[layer])).flat()
}[axis]().map(r => r.current)
}

const xAxis = new Vector3(1, 0,0 ).normalize()
const yAxis = new Vector3(0, 1, 0).normalize()
const zAxis = new Vector3(0, 0, 1).normalize()

const makeOrbiter = (angle: number, axis: Vector3) => {
  return (
    cube: Object3D, 
    callback: () => void, 
    animattionTime: number
  ) => orbit(cube, axis, angle, callback, animattionTime)
}
const orbitXPositive = makeOrbiter(Math.PI/2, xAxis)
const orbitXNegative = makeOrbiter(-Math.PI/2, xAxis)
const orbitYPositive = makeOrbiter(Math.PI/2, yAxis)
const orbitYNegative = makeOrbiter(-Math.PI/2, yAxis)
const orbitZPositive = makeOrbiter(Math.PI/2, zAxis)
const orbitZNegative = makeOrbiter(-Math.PI/2, zAxis)

const fns = {
  x: {
    '+': [rotateModelXLayerPositive, orbitXPositive], 
    '-': [rotateModelXLayerNegative, orbitXNegative]},
  y: {
    '+': [rotateModelYLayerPositive, orbitYPositive], 
    '-': [rotateModelYLayerNegative, orbitYNegative]},
  z: {
    '+': [rotateModelZLayerPositive, orbitZPositive], 
    '-': [rotateModelZLayerNegative, orbitZNegative]},
} as const

export const layerRotator = (
  axis: 'x'|'y'|'z',
  layer: 0|1|2,
  direction: '+'|'-',
  grid: GridModel,
  setGrid: (g :GridModel) => void,
  isRotating: MutableRefObject<boolean>,
) => (
    animationTime: number
  ) => {
      isRotating.current = true
      const [gridLayerRotator, objectOrbiter] = fns[axis][direction]
      layerObjects(grid, axis, layer).forEach((cube: Object3D) => {
        objectOrbiter(
          cube, 
          () => isRotating.current = false, 
          animationTime
        )
      })
      setGrid(gridLayerRotator(grid, layer))
      // navigator.vibrate?.([1])
}

export const cubeRotator = (
  axis: 'x'|'y'|'z',
  direction: '+'|'-',
  grid: GridModel,
  setGrid: (g :GridModel) => void,
  isRotating: MutableRefObject<boolean>,
) => (
  animationTime: number
) => {
  layerRotator(axis, 0, direction, grid, setGrid, isRotating)(animationTime)
  layerRotator(axis, 1, direction, grid, setGrid, isRotating)(animationTime)
  layerRotator(axis, 2, direction, grid, setGrid, isRotating)(animationTime)
}