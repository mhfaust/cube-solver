import { MutableRefObject } from "react";
import { Object3D, Vector3 } from "three";
import { Cube, GridModel } from "../store/cubeSlice";

function copyModel<T> (grid: T[][][]) {
  return grid.map(dim2 => dim2.map(dim1 => dim1.slice()))
}

type Swaps = [0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2][]

const swap = (grid: GridModel, swaps: Swaps) => {
  const newGrid = copyModel(grid)

  const news = swaps.map(s => ({ 
    current: grid[s[3]][s[4]][s[5]].wrapperMesh.current ,
    initialPosition: grid[s[3]][s[4]][s[5]].intialPosition
  }))
  swaps.forEach((s, i) => {
    newGrid[s[0]][s[1]][s[2]].wrapperMesh.current = news[i].current
    newGrid[s[0]][s[1]][s[2]].intialPosition = news[i].initialPosition
  })
  return newGrid
}


const rotateModelXLayerPositive = (grid: GridModel, x: 0|1|2) => {
  return swap(grid, [
    [x,0,0, x,0,2],
    [x,0,1, x,1,2],
    [x,0,2, x,2,2],
    [x,1,0, x,0,1],
    [x,1,1, x,1,1],
    [x,1,2, x,2,1],
    [x,2,0, x,0,0],
    [x,2,1, x,1,0],
    [x,2,2, x,2,0],
  ])
}

const rotateModelXLayerNegative: LayerRotator = (grid: GridModel, x: 0|1|2) => {
  return swap(grid, [
    [x,0,0, x,2,0],
    [x,0,1, x,1,0],
    [x,0,2, x,0,0],
    [x,1,0, x,2,1],
    [x,1,1, x,1,1],
    [x,1,2, x,0,1],
    [x,2,0, x,2,2],
    [x,2,1, x,1,2],
    [x,2,2, x,0,2],
  ])
}

const rotateModelYLayerPositive: LayerRotator = (grid: GridModel, y: 0|1|2) => {

  return swap(grid, [
    [0,y,0, 2,y,0],
    [0,y,1, 1,y,0],
    [0,y,2, 0,y,0],
    [1,y,0, 2,y,1],
    [1,y,1, 1,y,1],
    [1,y,2, 0,y,1],
    [2,y,0, 2,y,2],
    [2,y,1, 1,y,2],
    [2,y,2, 0,y,2],
  ])
}

const rotateModelYLayerNegative: LayerRotator = (grid: GridModel, y: 0|1|2) => {
  return swap(grid, [
    [0,y,0, 0,y,2],
    [0,y,1, 1,y,2],
    [0,y,2, 2,y,2],
    [1,y,0, 0,y,1],
    [1,y,1, 1,y,1],
    [1,y,2, 2,y,1],
    [2,y,0, 0,y,0],
    [2,y,1, 1,y,0],
    [2,y,2, 2,y,0],
  ])
}

const rotateModelZLayerPositive: LayerRotator = (grid: GridModel, z: 0|1|2) => {
  return swap(grid, [
    [0,0,z, 0,2,z],
    [0,1,z, 1,2,z],
    [0,2,z, 2,2,z],
    [1,0,z, 0,1,z],
    [1,1,z, 1,1,z],
    [1,2,z, 2,1,z],
    [2,0,z, 0,0,z],
    [2,1,z, 1,0,z],
    [2,2,z, 2,0,z],
  ])
}

const rotateModelZLayerNegative: LayerRotator = (grid: GridModel, z: 0|1|2) => {
  return swap(grid, [
    [0,0,z, 2,0,z],
    [0,1,z, 1,0,z],
    [0,2,z, 0,0,z],
    [1,0,z, 2,1,z],
    [1,1,z, 1,1,z],
    [1,2,z, 0,1,z],
    [2,0,z, 2,2,z],
    [2,1,z, 1,2,z],
    [2,2,z, 0,2,z],
  ])
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

function layerObjects <T>(model: Cube[][][], axis: 'x'|'y'|'z', layer: 0|1|2) {
return {
  'x': () => model[layer].flat(),
  'y': () => model.map(i => i[layer]).flat(),
  'z': () => model.map(j => j.map(y => y[layer])).flat()
}[axis]()
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
      layerObjects(grid, axis, layer).forEach((cube: Cube) => {
        objectOrbiter(
          cube.wrapperMesh.current, 
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