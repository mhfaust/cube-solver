import { ThreeEvent } from "@react-three/fiber"
import { rotationDirection } from "./rotationDirection"
import { V } from "@/utils/vectors"

/**
 * Compares the vector between two fingers before and after movement to determine spin direction.
 *
 * @param finger1 - Start/end events for the first finger.
 * @param finger2 - Start/end events for the second finger.
 */
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
