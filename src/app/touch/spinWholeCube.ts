import { MoveCode } from "@/app/utils/moveCodes"
import { AxisDirection, swipeInfo } from "./pointers"

const map = {
  'down': 'X',
  'up': 'Xi',
  'right': 'Y',
  'left': 'Yi',
} as const

const spinWholeCube = (swipe: Pick<ReturnType<typeof swipeInfo>, 'axisDirection'>) => {
  const { axisDirection } = swipe
  return map[axisDirection]
}

export default spinWholeCube
