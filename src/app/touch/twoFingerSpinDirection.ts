import { ThreeEvent } from "@react-three/fiber"
import { rotationDirection } from "./rotationDirection"
import { V } from "../utils/vectors"

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