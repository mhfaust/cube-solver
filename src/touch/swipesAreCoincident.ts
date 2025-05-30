import { ThreeEvent } from "@react-three/fiber"
import { swipeInfo } from "./pointers"
import { getBlockPosition } from "@/utils/grid"
import { CubeGrid } from "@/store/cubeSlice"

const swipesAreCoincident = (
  grid: CubeGrid,
  finger1: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>], 
  finger2: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>],

) => {
  const swipe1 = swipeInfo(finger1[0], finger1[1])
  const swipe2 = swipeInfo(finger2[0], finger2[1])

  if (swipe1.axisDirection !== swipe2.axisDirection) {
    return false
  }
  const fingerPosition1 = getBlockPosition(grid, finger1[0].eventObject)
  const fingerPosition2 = getBlockPosition(grid, finger2[0].eventObject)
  if(!fingerPosition1 || !fingerPosition2) {
    return false
  }
  if(['down', 'up'].includes(swipe1.axisDirection)) {
    return fingerPosition1[0] === fingerPosition2[0]
  }
  else {
    return fingerPosition1[1] === fingerPosition2[1]
  }
}

export default swipesAreCoincident