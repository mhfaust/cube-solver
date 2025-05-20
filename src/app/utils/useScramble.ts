import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import { useExecuteMove } from "./useExecuteMove"
import { useIsRotating } from "../store/selectors"
import { useActions } from "../store/useAppStore"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SCRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {
  const isRotating = useIsRotating()
  const executeMove = useExecuteMove()
  const { clearHistory } = useActions()
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
      executeMove(nextMove, SCRAMBLE_ROTATION_TIME, isRotating)
      

      if(randomSequence.length){
        setTimeout(recurse, SCRAMBLE_ROTATION_TIME)
      }
      else {
        clearHistory()
      }
    }
    recurse()
  }, [executeMove, isRotating, clearHistory])
}

export default useScramble