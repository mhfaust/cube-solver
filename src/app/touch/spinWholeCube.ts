import { MoveCode } from "../utils/moveCodes"
import { AxisDirection, swipeInfo } from "./pointers"

const map: Record<AxisDirection, MoveCode> = {
  'down': 'X',
  'up': 'X′',
  'right': 'Y',
  'left': 'Y′',
}

const spinWholeCube = (swipe: Pick<ReturnType<typeof swipeInfo>, 'axisDirection'>) => {
  const { axisDirection } = swipe
  return map[axisDirection]
}

export default spinWholeCube
