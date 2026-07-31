import { swipeInfo } from "./pointers"

const map = {
  'down': 'X',
  'up': 'Xi',
  'right': 'Y',
  'left': 'Yi',
} as const

/**
 * Maps a swipe axis direction to a whole-cube rotation move.
 *
 * @param swipe - Swipe metadata with axis direction.
 */
const spinWholeCube = (swipe: Pick<ReturnType<typeof swipeInfo>, 'axisDirection'>) => {
  const { axisDirection } = swipe
  return map[axisDirection]
}

export default spinWholeCube
