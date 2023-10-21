import { MutableRefObject } from "react";
import { Object3D, Vector3 } from "three";
import { Cube, GridModel } from "../store/cubeSlice";

function copyModel<T> (grid: T[][][]) {
  return grid.map(dim2 => dim2.map(dim1 => dim1.slice()))
}


const rotateModelXLayerPositive = (grid: GridModel, x: 0|1|2) => {
  const newx00Mesh = grid[x][0][2].wrapperMesh.current
  const newx01Mesh = grid[x][1][2].wrapperMesh.current
  const newx02Mesh = grid[x][2][2].wrapperMesh.current
  const newx10Mesh = grid[x][0][1].wrapperMesh.current
  const newx11Mesh = grid[x][1][1].wrapperMesh.current
  const newx12Mesh = grid[x][2][1].wrapperMesh.current
  const newx20Mesh = grid[x][0][0].wrapperMesh.current
  const newx21Mesh = grid[x][1][0].wrapperMesh.current
  const newx22Mesh = grid[x][2][0].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[x][0][0].wrapperMesh.current = newx00Mesh
  newGrid[x][0][1].wrapperMesh.current = newx01Mesh
  newGrid[x][0][2].wrapperMesh.current = newx02Mesh
  newGrid[x][1][0].wrapperMesh.current = newx10Mesh
  newGrid[x][1][1].wrapperMesh.current = newx11Mesh
  newGrid[x][1][2].wrapperMesh.current = newx12Mesh
  newGrid[x][2][0].wrapperMesh.current = newx20Mesh
  newGrid[x][2][1].wrapperMesh.current = newx21Mesh
  newGrid[x][2][2].wrapperMesh.current = newx22Mesh
  
  return newGrid
}

const rotateModelXLayerNegative: LayerRotator = (grid: GridModel, x: 0|1|2) => {
  const newx00Mesh = grid[x][2][0].wrapperMesh.current
  const newx01Mesh = grid[x][1][0].wrapperMesh.current
  const newx02Mesh = grid[x][0][0].wrapperMesh.current
  const newx10Mesh = grid[x][2][1].wrapperMesh.current
  const newx11Mesh = grid[x][1][1].wrapperMesh.current
  const newx12Mesh = grid[x][0][1].wrapperMesh.current
  const newx20Mesh = grid[x][2][2].wrapperMesh.current
  const newx21Mesh = grid[x][1][2].wrapperMesh.current
  const newx22Mesh = grid[x][0][2].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[x][0][0].wrapperMesh.current = newx00Mesh
  newGrid[x][0][1].wrapperMesh.current = newx01Mesh
  newGrid[x][0][2].wrapperMesh.current = newx02Mesh
  newGrid[x][1][0].wrapperMesh.current = newx10Mesh
  newGrid[x][1][1].wrapperMesh.current = newx11Mesh
  newGrid[x][1][2].wrapperMesh.current = newx12Mesh
  newGrid[x][2][0].wrapperMesh.current = newx20Mesh
  newGrid[x][2][1].wrapperMesh.current = newx21Mesh
  newGrid[x][2][2].wrapperMesh.current = newx22Mesh
  
  return newGrid
}

const rotateModelYLayerPositive: LayerRotator = (grid: GridModel, y: 0|1|2) => {
  const new0y0Mesh = grid[2][y][0].wrapperMesh.current
  const new0y1Mesh = grid[1][y][0].wrapperMesh.current
  const new0y2Mesh = grid[0][y][0].wrapperMesh.current
  const new1y0Mesh = grid[2][y][1].wrapperMesh.current
  const new1y1Mesh = grid[1][y][1].wrapperMesh.current
  const new1y2Mesh = grid[0][y][1].wrapperMesh.current
  const new2y0Mesh = grid[2][y][2].wrapperMesh.current
  const new2y1Mesh = grid[1][y][2].wrapperMesh.current
  const new2y2Mesh = grid[0][y][2].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[0][y][0].wrapperMesh.current = new0y0Mesh
  newGrid[0][y][1].wrapperMesh.current = new0y1Mesh
  newGrid[0][y][2].wrapperMesh.current = new0y2Mesh
  newGrid[1][y][0].wrapperMesh.current = new1y0Mesh
  newGrid[1][y][1].wrapperMesh.current = new1y1Mesh
  newGrid[1][y][2].wrapperMesh.current = new1y2Mesh
  newGrid[2][y][0].wrapperMesh.current = new2y0Mesh
  newGrid[2][y][1].wrapperMesh.current = new2y1Mesh
  newGrid[2][y][2].wrapperMesh.current = new2y2Mesh
  
  return newGrid
}

const rotateModelYLayerNegative: LayerRotator = (grid: GridModel, y: 0|1|2) => {
  const new0y0Mesh = grid[0][y][2].wrapperMesh.current
  const new0y1Mesh = grid[1][y][2].wrapperMesh.current
  const new0y2Mesh = grid[2][y][2].wrapperMesh.current
  const new1y0Mesh = grid[0][y][1].wrapperMesh.current
  const new1y1Mesh = grid[1][y][1].wrapperMesh.current
  const new1y2Mesh = grid[2][y][1].wrapperMesh.current
  const new2y0Mesh = grid[0][y][0].wrapperMesh.current
  const new2y1Mesh = grid[1][y][0].wrapperMesh.current
  const new2y2Mesh = grid[2][y][0].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[0][y][0].wrapperMesh.current = new0y0Mesh
  newGrid[0][y][1].wrapperMesh.current = new0y1Mesh
  newGrid[0][y][2].wrapperMesh.current = new0y2Mesh
  newGrid[1][y][0].wrapperMesh.current = new1y0Mesh
  newGrid[1][y][1].wrapperMesh.current = new1y1Mesh
  newGrid[1][y][2].wrapperMesh.current = new1y2Mesh
  newGrid[2][y][0].wrapperMesh.current = new2y0Mesh
  newGrid[2][y][1].wrapperMesh.current = new2y1Mesh
  newGrid[2][y][2].wrapperMesh.current = new2y2Mesh
  
  return newGrid
}

const rotateModelZLayerPositive: LayerRotator = (grid: GridModel, z: 0|1|2) => {
  const new00zMesh = grid[0][2][z].wrapperMesh.current
  const new01zMesh = grid[1][2][z].wrapperMesh.current
  const new02zMesh = grid[2][2][z].wrapperMesh.current
  const new10zMesh = grid[0][1][z].wrapperMesh.current
  const new11zMesh = grid[1][1][z].wrapperMesh.current
  const new12zMesh = grid[2][1][z].wrapperMesh.current
  const new20zMesh = grid[0][0][z].wrapperMesh.current
  const new21zMesh = grid[1][0][z].wrapperMesh.current
  const new22zMesh = grid[2][0][z].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[0][0][z].wrapperMesh.current = new00zMesh
  newGrid[0][1][z].wrapperMesh.current = new01zMesh
  newGrid[0][2][z].wrapperMesh.current = new02zMesh
  newGrid[1][0][z].wrapperMesh.current = new10zMesh
  newGrid[1][1][z].wrapperMesh.current = new11zMesh
  newGrid[1][2][z].wrapperMesh.current = new12zMesh
  newGrid[2][0][z].wrapperMesh.current = new20zMesh
  newGrid[2][1][z].wrapperMesh.current = new21zMesh
  newGrid[2][2][z].wrapperMesh.current = new22zMesh
  
  return newGrid
}

const rotateModelZLayerNegative: LayerRotator = (grid: GridModel, z: 0|1|2) => {
  const new00zMesh = grid[2][0][z].wrapperMesh.current
  const new01zMesh = grid[1][0][z].wrapperMesh.current
  const new02zMesh = grid[0][0][z].wrapperMesh.current
  const new10zMesh = grid[2][1][z].wrapperMesh.current
  const new11zMesh = grid[1][1][z].wrapperMesh.current
  const new12zMesh = grid[0][1][z].wrapperMesh.current
  const new20zMesh = grid[2][2][z].wrapperMesh.current
  const new21zMesh = grid[1][2][z].wrapperMesh.current
  const new22zMesh = grid[0][2][z].wrapperMesh.current

  const newGrid = copyModel(grid)
  newGrid[0][0][z].wrapperMesh.current = new00zMesh
  newGrid[0][1][z].wrapperMesh.current = new01zMesh
  newGrid[0][2][z].wrapperMesh.current = new02zMesh
  newGrid[1][0][z].wrapperMesh.current = new10zMesh
  newGrid[1][1][z].wrapperMesh.current = new11zMesh
  newGrid[1][2][z].wrapperMesh.current = new12zMesh
  newGrid[2][0][z].wrapperMesh.current = new20zMesh
  newGrid[2][1][z].wrapperMesh.current = new21zMesh
  newGrid[2][2][z].wrapperMesh.current = new22zMesh
  
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