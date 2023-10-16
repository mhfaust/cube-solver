import { ThreeEvent } from "@react-three/fiber"
import { isOnCube, swipeInfo } from "./pointers"
import { GridModel, getCubePosition } from "./grid"
import { Logger } from "./types"
import { MoveCode } from "./moveNotation"

const frontOrBackSpin = (
  grid: GridModel,
  downPointer: ThreeEvent<PointerEvent>,
  upPointer: ThreeEvent<PointerEvent>,
  otherDownPointer: ThreeEvent<PointerEvent>,
  log?: Logger
): MoveCode => {
  const { dx, dy, axisDirection } = swipeInfo(downPointer, upPointer)
  const swipedAbove = upPointer.y < otherDownPointer.y 
  const swipedRight = dx > 0
  const swipedUp = dy > 0

  //BACK face:
  if( isOnCube(otherDownPointer) ) {
    return swipedAbove === swipedRight ? 'B′' : 'B'
  }
  //FRONT face:

  const [i,j] = getCubePosition(grid, downPointer.eventObject)!
  // log?.(i, j)
  switch (`${i}${j}`) {
    case '00': 
      return ['up', 'left'].includes(axisDirection) ? 'F' : 'F′'
    case '01': 
      return dy > 0 ? 'F′' : 'F'
    case '02': 
      return ['up', 'right'].includes(axisDirection) ? 'F' : 'F′'
    case '10':
      return dx > 0 ? 'F′' : 'F'
    case '11': 
      return 'F'  
    case '12': 
      return dx > 0 ? 'F' : 'F′'
    case '20': 
      return ['down', 'left'].includes(axisDirection) ? 'F' : 'F′'
    case '21': 
      return dy > 0 ? 'F' : 'F′'
    case '22': 
      return ['down', 'right'].includes(axisDirection)  ? 'F' : 'F′'


  }
  return swipedAbove === swipedRight ? 'F' : 'F′'


}

export default frontOrBackSpin