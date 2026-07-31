import { ThreeEvent } from "@react-three/fiber";

const { sqrt, pow } = Math

export type V = [number, number]

/**
 * Builds a 2D vector from one pointer position to another.
 *
 * @param e1 - Start event.
 * @param e2 - End event.
 */
export const vector = (e1:  ThreeEvent<PointerEvent>, e2:  ThreeEvent<PointerEvent>): V => {
  return [e2.x - e1.x, e2.y - e1.y]
}

/**
 * Computes Euclidean distance between two pointer events.
 *
 * @param e1 - Start event.
 * @param e2 - End event.
 */
export const displacement = (e1:  ThreeEvent<PointerEvent>, e2:  ThreeEvent<PointerEvent>) => {
  return sqrt(pow(e2.x - e1.x, 2) + pow(e2.y - e1.y, 2))
}

/**
 * Computes elapsed time in milliseconds between two pointer events.
 *
 * @param e1 - Start event.
 * @param e2 - End event.
 */
export const interval = (e1:  ThreeEvent<PointerEvent>, e2:  ThreeEvent<PointerEvent>) => {
  return e2.timeStamp - e1.timeStamp
}
