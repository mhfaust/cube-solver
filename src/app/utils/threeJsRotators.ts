import { MutableRefObject } from "react";
import { Object3D, Vector3 } from "three";
import { SingleBlock, CubeGrid } from "@/app/store/cubeSlice";

/**
 * Rotates a cube object around a specified axis by a given angle.
 *
 * @param threeJsCube - The cube object to be rotated.
 * @param axis - The axis of rotation (x, y, or z).
 * @param angle - The angle of rotation in radians.
 * @param callback - A callback function to be executed after the rotation is complete.
 * @param animationTime - The duration of the animation in milliseconds.
 */
function orbit(
  threeJsCube: Object3D, 
  axis: Vector3, 
  angle: number,
  callback: () => void,
  animationTime: number
) {
  const rotationSteps = Math.floor(animationTime / 5)
  if (!animationTime) {
    return threeJsCube.rotateOnWorldAxis(axis, angle)
  }
  const recurse = (i: number) => {
    setTimeout(() => {
      threeJsCube.rotateOnWorldAxis(axis, angle / (rotationSteps))
      if(i < rotationSteps - 1){
        recurse(i + 1)
      } else setTimeout(callback, 1)
    }, animationTime / rotationSteps)
  }
  recurse(0)
}

function layerObjects <T>(cubeGrid: CubeGrid, axis: 'x'|'y'|'z', layer: 0|1|2) {
return {
  'x': () => cubeGrid[layer].flat(),
  'y': () => cubeGrid.map(i => i[layer]).flat(),
  'z': () => cubeGrid.map(j => j.map(y => y[layer])).flat()
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

const rotationFunctionsByAxisAndDirection = {
  x: {
    '+': orbitXPositive, 
    '-': orbitXNegative},
  y: {
    '+': orbitYPositive, 
    '-': orbitYNegative},
  z: {
    '+': orbitZPositive, 
    '-': orbitZNegative},
} as const

export const layerRenderingRotator = (
  axis: 'x'|'y'|'z',
  layer: 0|1|2,
  direction: '+'|'-',
) => (cube: CubeGrid, animationTime: number, isRotating: MutableRefObject<boolean>) => {

      isRotating.current = true

      const objectOrbiter = rotationFunctionsByAxisAndDirection[axis][direction]

      layerObjects(cube, axis, layer).forEach((block: SingleBlock) => {
        objectOrbiter(
          block.wrapperMesh.current, 
          () => isRotating.current = false, 
          animationTime
        )
      })
      // navigator.vibrate?.([1])
}

/**
 * HOF that creates a function to execute a cubeGrid full rotation (all 3 layers) given a cubeGrid, direction, 
 *
 * @param axis - The axis of rotation ('x', 'y', or 'z').
 * @param direction - The direction of rotation ('+' for clockwise, '-' for counterclockwise).
 * @param cubeGrid - The current state of the cube represented as a `Cube`.
 * @param setCubeGrid - A function to update the cube's state.
 * @param isRotating - A mutable reference object indicating whether a rotation is in progress.
 * @returns A function that performs the rotation animation over a specified duration.
 *
 * The returned function takes a single parameter:
 * @param animationTime - The duration of the rotation animation in milliseconds.
 */
export const cubeRenderingRotator = (
  axis: 'x'|'y'|'z',
  direction: '+'|'-',
) => (cubeGrid: CubeGrid, animationTime: number, isRotating: MutableRefObject<boolean>) => {
  layerRenderingRotator(axis, 0, direction) (cubeGrid, animationTime, isRotating)
  layerRenderingRotator(axis, 1, direction) (cubeGrid, animationTime, isRotating)
  layerRenderingRotator(axis, 2, direction) (cubeGrid, animationTime, isRotating)
}