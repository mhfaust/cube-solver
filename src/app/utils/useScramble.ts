import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import { modelSpinFunctions, renderingSpinFunctions } from "./modelSpinFunctions"
import { useCubeGrid, useIsRotating } from "../store/selectors"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SCRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {
  const isRotating = useIsRotating()
  const cubeGrid = useCubeGrid()

  return useCallback(() => {

    const randomSequence = Array.from(
      { length: 100 }, 
      () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
    )
    const recurse = () => {
      const nextMove = randomSequence.pop()
      if(!nextMove){
        return
      }
      modelSpinFunctions[nextMove](cubeGrid)
      renderingSpinFunctions[nextMove](
        cubeGrid,
        SCRAMBLE_ROTATION_TIME,isRotating)

      if(randomSequence.length){
        setTimeout(recurse, SCRAMBLE_ROTATION_TIME)
      }
    }
    recurse()
  }, [cubeGrid])
}

export default useScramble