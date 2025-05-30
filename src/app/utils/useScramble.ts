import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import { useCubeStore } from "../store/cubeSlice"

const oneLayerSpins: MoveCode[] = [
  'U' , 'Ui' , 'D' , 'Di' , 'E' , 'Ei' ,
  'R' , 'Ri' , 'L' , 'Li' , 'M' , 'Mi' ,
  'F' , 'Fi' , 'B' , 'Bi' , 'S' , 'Si'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SCRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {
  const { clearHistory, executeMove } = useCubeStore()
  return useCallback(() => {
    clearHistory()

    const randomSequence = Array.from(
      { length: 2 }, 
      () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
    )
    const recurse = () => {
      const nextMove = randomSequence.pop()
      if(!nextMove){
        return
      }
      executeMove(nextMove, SCRAMBLE_ROTATION_TIME, false)

      if(randomSequence.length){
        setTimeout(recurse, SCRAMBLE_ROTATION_TIME)
      }
    }
    recurse()
  }, [executeMove, clearHistory])
}

export default useScramble