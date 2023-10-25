import { V } from "@/app/utils/vectors";


/**
 *
 * @param a Vector
 * @param b Vector
 * @returns 1 if a to b sweeps clockwise, -1 if counterclockwise, and 0 if coincident or 180.
 */

export const rotationDirection = (a: V, b: V): -1 | 0 | 1 => {
  const crossProduct = (a[0] * b[1]) - (a[1] * b[0])
  return Math.sign(crossProduct) as -1 | 0 | 1
}
