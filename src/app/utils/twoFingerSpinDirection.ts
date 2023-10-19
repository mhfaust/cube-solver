import { ThreeEvent } from "@react-three/fiber"

type V = [number, number]

/**
 * 
 * @param a Vector
 * @param b Vector
 * @returns 1 if a to b sweeps clockwise, -1 if counterclockwise, and 0 if coincident or 180.
 */
export const rotationDirection = (a: V, b: V): -1|0|1 => {
  const crossProduct = (a[0] * b[1]) - (a[1] * b[0])
  return Math.sign(crossProduct) as -1|0|1
}

const twoFingerSpinDirection = (
  finger1: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>], 
  finger2: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>]
) => {
  const [f1Start, f1End] = finger1
  const [f2Start, f2End] = finger2

  const startVector: V = [f2Start.x - f1Start.x, f2Start.y - f1Start.y]
  const endVector: V = [f2End.x - f1End.x, f2End.y - f1End.y]

  return rotationDirection(startVector, endVector)
}

export default twoFingerSpinDirection