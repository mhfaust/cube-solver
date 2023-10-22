import { ThreeEvent } from "@react-three/fiber";
import { swipeInfo } from "./pointers";
import { MoveCode } from "../utils/moveCodes";
import { InfoMessage } from "./spinScheduler";

const spinZ = (
  downPointer: ThreeEvent<PointerEvent>, 
  upPointer: ThreeEvent<PointerEvent>,
  basePointer: ThreeEvent<PointerEvent>
) => {
  const swipe = swipeInfo(downPointer, upPointer)

  const wentRight = ['upRight', 'downRight'].includes(swipe.quadrantDirection)
  const isAbove = upPointer.unprojectedPoint.y > basePointer.unprojectedPoint.y

  return wentRight === isAbove ? 'Z' : 'Z′'
}

export default spinZ