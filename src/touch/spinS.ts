import { ThreeEvent } from "@react-three/fiber";
import { swipeInfo } from "./pointers";

/**
 * Resolves a two-finger off-cube gesture into an S slice move.
 *
 * @param downPointer - Moving finger pointer-down event.
 * @param upPointer - Moving finger pointer-up event.
 * @param basePointer - Reference finger pointer-down event.
 */
const spinS = (
  downPointer: ThreeEvent<PointerEvent>, 
  upPointer: ThreeEvent<PointerEvent>,
  basePointer: ThreeEvent<PointerEvent>
) => {
  const swipe = swipeInfo(downPointer, upPointer)

  const wentRight = ['upRight', 'downRight'].includes(swipe.quadrantDirection)
  const isAbove = upPointer.unprojectedPoint.y > basePointer.unprojectedPoint.y

  return wentRight === isAbove ? 'S' : 'Si'
}

export default spinS
