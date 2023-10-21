import { ThreeEvent } from "@react-three/fiber"
import { swipeInfo } from "../utils/pointers"
import { getCubePosition } from "../utils/grid"
import { GridModel } from "../store/cubeSlice"

const swipesAreCoincident = (
  grid: GridModel,
  finger1: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>], 
  finger2: [ThreeEvent<PointerEvent>, ThreeEvent<PointerEvent>],

) => {
  const swipe1 = swipeInfo(finger1[0], finger1[1])
  const swipe2 = swipeInfo(finger2[0], finger2[1])

  if (swipe1.axisDirection !== swipe2.axisDirection) {
    return false
  }
  const fingerPosition1 = getCubePosition(grid, finger1[0].eventObject)
  const fingerPosition2 = getCubePosition(grid, finger2[0].eventObject)
  if(!fingerPosition1 || !fingerPosition2) {
    return false
  }
  if(['down' || 'up'].includes(swipe1.axisDirection)) {
    return fingerPosition1[0] === fingerPosition2[0]
  }
  else {
    return fingerPosition1[1] === fingerPosition2[1]
  }
}

export default swipesAreCoincident