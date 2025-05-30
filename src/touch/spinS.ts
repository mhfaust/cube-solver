import { ThreeEvent } from "@react-three/fiber";
import { swipeInfo } from "./pointers";

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