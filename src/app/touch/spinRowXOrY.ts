import { getCubePosition } from "../utils/grid"
import { ThreeEvent } from "@react-three/fiber"
import { AxisDirection, swipeInfo } from "./pointers"
import { MoveCode } from "../utils/moveCodes"
import { GridModel } from "../store/cubeSlice"

const spinRowXOrY = (
    grid: GridModel, 
    downPointer: ThreeEvent<PointerEvent>, 
    upPointer: ThreeEvent<PointerEvent>
  ) => {

  const position = getCubePosition(grid, downPointer.eventObject)
  if(!position){
    return { error: "Unexpected: downPointer not on any cube"}
  }

  const [i,j] = position

  const { 
    distance, 
    time, 
    axisDirection: 
    direction, 
    isVertical 
  } = swipeInfo(downPointer, upPointer)

  if(distance > 10 && time < 500 ) {
    const map: Record<AxisDirection, MoveCode[]> = {
      'down': ['L', 'M', 'R′'],
      'up': ['L′', 'M′', 'R'],
      'right': ['D', 'E', 'U′'],
      'left': ['D′', 'E′', 'U'],
    }
    const move: MoveCode = map[direction][isVertical ? i : j]
    return move
  }
}

export default spinRowXOrY