import { ThreeEvent } from "@react-three/fiber"

type V = [number, number]

export const rotationDirection = (a: V, b: V): -1|0|1 => {
  const crossProduct = (a[0] * b[1]) + (a[1] * b[0])
  return Math.sign(crossProduct) as -1|0|1
}

const twoFingerRotationDirection = (
  finger1: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>], 
  finger2: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>]
) => {
  const [f1Start, f1End] = finger1
  const [f2Start, f2End] = finger2

  const initialSeparation: V = [f2Start.x - f1Start.x, f2Start.y - f1Start.y]
  const aMove: V = [f1End.x - f1Start.x, f1End.y - f1Start.y]
  const bMove: V = [f2End.x - f2Start.x, f2End.y - f2Start.y]

  const aRotDir = rotationDirection(aMove, initialSeparation)

  if (rotationDirection(aMove, initialSeparation) === rotationDirection(bMove, initialSeparation)) {
    return 0 //not rotating
  }

  return aRotDir
}

export default twoFingerRotationDirection