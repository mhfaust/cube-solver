import { ThreeEvent } from "@react-three/fiber"
import { isOnCube, swipeInfo } from "./pointers"
import { getBlockPosition } from "@/utils/grid"
import { MoveCode } from "@/utils/moveCodes"
import { CubeGrid } from "@/store/cubeSlice"

/**
 * Resolves a two-finger mixed swipe into a front or back face rotation.
 *
 * @param grid - Cube block grid.
 * @param downPointer - Active finger pointer-down event.
 * @param upPointer - Active finger pointer-up event.
 * @param otherDownPointer - Second finger pointer-down event.
 */
const spinFrontOrBack = (
  grid: CubeGrid,
  downPointer: ThreeEvent<PointerEvent>,
  upPointer: ThreeEvent<PointerEvent>,
  otherDownPointer: ThreeEvent<PointerEvent>,
): MoveCode | undefined => {
  const { dx, dy, axisDirection } = swipeInfo(downPointer, upPointer)
  const swipedAbove = upPointer.y < otherDownPointer.y 
  const swipedRight = dx > 0

  //BACK face:
  if(isOnCube(otherDownPointer)) {
    return swipedAbove === swipedRight ? 'Bi' : 'B'
  }
  //FRONT face:
  const position = getBlockPosition(grid, downPointer.eventObject)!
  if(position) {
    const [i, j] = position
    // log?.(i, j)
    switch (`${i}${j}`) {
      case '00': 
        return ['up', 'left'].includes(axisDirection) ? 'F' : 'Fi'
      case '01': 
        return dy > 0 ? 'Fi' : 'F'
      case '02': 
        return ['up', 'right'].includes(axisDirection) ? 'F' : 'Fi'
      case '10':
        return dx > 0 ? 'Fi' : 'F'
      case '11': 
        return undefined  
      case '12': 
        return dx > 0 ? 'F' : 'Fi'
      case '20': 
        return ['down', 'left'].includes(axisDirection) ? 'F' : 'Fi'
      case '21': 
        return dy > 0 ? 'F' : 'Fi'
      case '22': 
        return ['down', 'right'].includes(axisDirection)  ? 'F' : 'Fi'
      default:
        return undefined
    }
  }

}

export default spinFrontOrBack
