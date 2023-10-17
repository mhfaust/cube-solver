import { Object3D } from "three"
import { GridModel, getCubePosition } from "./grid"
import { ThreeEvent } from "@react-three/fiber"
import { AxisDirection, swipeInfo } from "./pointers"
import { MoveCode } from "./moveNotation"

const spinRoXOrY = (
    grid: GridModel, 
    downPointer: ThreeEvent<PointerEvent>, 
    upPointer: ThreeEvent<PointerEvent>
  ) => {
    
  const [i,j] = getCubePosition(grid, downPointer.eventObject)!

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

export default spinRoXOrY