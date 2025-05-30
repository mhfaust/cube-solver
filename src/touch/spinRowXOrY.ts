import { getBlockPosition } from "@/utils/grid"
import { ThreeEvent } from "@react-three/fiber"
import { AxisDirection, swipeInfo } from "./pointers"
import { MoveCode } from "@/utils/moveCodes"
import { CubeGrid } from "@/store/cubeSlice"

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
      'down': ['L', 'M', 'Ri'],
      'up': ['Li', 'Mi', 'R'],
      'right': ['D', 'E', 'Ui'],
      'left': ['Di', 'Ei', 'U'],
    }
    const move: MoveCode = map[direction][isVertical ? i : j]
    return move
  }
}

export default spinRowXOrY