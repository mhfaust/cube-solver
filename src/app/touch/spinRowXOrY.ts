import { getBlockPosition } from "@/app/utils/grid"
import { ThreeEvent } from "@react-three/fiber"
import { AxisDirection, swipeInfo } from "./pointers"
import { MoveCode } from "@/app/utils/moveCodes"
import { CubeGrid } from "@/app/store/cubeSlice"

const spinRowXOrY = (
    grid: CubeGrid, 
    downPointer: ThreeEvent<PointerEvent>, 
    upPointer: ThreeEvent<PointerEvent>
  ) => {

  const positionOfTouchedBlock = getBlockPosition(grid, downPointer.eventObject)
  if(!positionOfTouchedBlock){
    return undefined
    // return { error: "Unexpected: downPointer not on any cube"}
  }

  const [i,j] = positionOfTouchedBlock

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