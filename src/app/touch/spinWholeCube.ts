import { MoveCode } from "@/app/utils/moveCodes"
import { AxisDirection, swipeInfo } from "./pointers"

const map = {
  'down': 'X',
  'up': 'X′',
  'right': 'Y',
  'left': 'Y′',
} as const

const spinWholeCube = (swipe: Pick<ReturnType<typeof swipeInfo>, 'axisDirection'>) => {
  const { axisDirection } = swipe
  return map[axisDirection]
}

export default spinWholeCube
