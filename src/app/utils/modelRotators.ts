import { CubeGrid } from "@/app/store/cubeSlice";

function copyModel (cube: CubeGrid) {
  return cube.map(dim2 => dim2.map(dim1 => dim1.slice()))
}
// Represents a translation instruction for moving a single block of a cube.
type TranslationTuple = [0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2, 0|1|2]

// Represents an array of translation instructions for rotating a layer (9 blocks) of a cube.
type LayerRotationTranslations = [
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple, 
  TranslationTuple
]

/**
 * Rotates the positions of elements in one layer of a 3D cubeGrid (Cube),
 * based on the provided rotation instructions.
 *
 * @param cubeGrid - The original 3D cubeGrid (CubeGrid) to perform the swaps on.
 * @param translations - An array of translation instructions, where each instruction is a tuple
 *                containing the source and target indices for one block of a cube in the format:
 *                [targetX, targetY, targetZ, sourceX, sourceY, sourceZ].
 * @returns A new 3D cubeGrid (CubeGrid) with one layer's blocks rotated according to the instructions.
 */
const rotateModelLayer = (cubeGrid: CubeGrid, translations: LayerRotationTranslations): CubeGrid => {
  const newGrid = copyModel(cubeGrid)

  const newBlockWrapperMeshes = translations.map(s => (cubeGrid[s[3]][s[4]][s[5]].current))

  translations.forEach((s, i) => {
    const newBlockWrapperMesh = newBlockWrapperMeshes[i]
    newGrid[s[0]][s[1]][s[2]].current = newBlockWrapperMesh
  })

  return newGrid
}

const rotateModelXLayerPositive = (cubeGrid: CubeGrid, x: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

const rotateModelXLayerNegative: LayerRotator = (cubeGrid: CubeGrid, x: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

const rotateModelYLayerPositive: LayerRotator = (cubeGrid: CubeGrid, y: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

const rotateModelYLayerNegative: LayerRotator = (cubeGrid: CubeGrid, y: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

const rotateModelZLayerPositive: LayerRotator = (cubeGrid: CubeGrid, z: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

const rotateModelZLayerNegative: LayerRotator = (cubeGrid: CubeGrid, z: 0|1|2) => {
  return rotateModelLayer(cubeGrid, [
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

type LayerRotator = (cubeGrid: CubeGrid, layer: 0 | 1 | 2) => CubeGrid


const rotationFunctionsByAxisAndDirection = {
  x: {
    '+': rotateModelXLayerPositive,
    '-': rotateModelXLayerNegative,
  },
  y: {
    '+': rotateModelYLayerPositive,
    '-': rotateModelYLayerNegative,
  },
  z: {
    '+': rotateModelZLayerPositive,
    '-': rotateModelZLayerNegative,
  },
} as const

export const layerModelRotator = (
  axis: 'x'|'y'|'z',
  layer: 0|1|2,
  direction: '+'|'-',
) => (cube: CubeGrid) => {

      const layerRotator = rotationFunctionsByAxisAndDirection[axis][direction]
      return layerRotator(cube, layer)
}

/**
 * HOF that creates a function to execute a cubeGrid full rotation (all 3 layers) given a cubeGrid, direction, 
 *
 * @param axis - The axis of rotation ('x', 'y', or 'z').
 * @param direction - The direction of rotation ('+' for clockwise, '-' for counterclockwise).
 * @returns A function that performs the rotation animation over a specified duration.
 *
 * The returned function takes a single parameter:
 * @param animationTime - The duration of the rotation animation in milliseconds.
 */
export const cubeModelRotator = (
  axis: 'x'|'y'|'z',
  direction: '+'|'-',
) => (cubeGrid: CubeGrid) => {
  const r1 = layerModelRotator(axis, 0, direction) (cubeGrid)
  const r2 = layerModelRotator(axis, 1, direction) (r1)
  const r3 = layerModelRotator(axis, 2, direction) (r2)
  return r3
}