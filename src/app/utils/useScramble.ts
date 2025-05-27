import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import { useActions } from "../store/useAppStore"

const oneLayerSpins: MoveCode[] = [
  'U' , 'Ui' , 'D' , 'Di' , 'E' , 'Ei' ,
  'R' , 'Ri' , 'L' , 'Li' , 'M' , 'Mi' ,
  'F' , 'Fi' , 'B' , 'Bi' , 'S' , 'Si'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SCRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {
  const { clearHistory, executeMove } = useActions()
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
      executeMove(nextMove, SCRAMBLE_ROTATION_TIME)

      if(randomSequence.length){
        setTimeout(recurse, SCRAMBLE_ROTATION_TIME)
      }
      else {
        clearHistory()
      }
    }
    recurse()
  }, [executeMove, clearHistory])
}

export default useScramble