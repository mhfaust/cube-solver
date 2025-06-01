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
  const { clearMoves, executeMove } = useCubeStore()
  return useCallback(() => {

    return new Promise((resolve) => {

      clearMoves();
  
      const randomSequence = Array.from(
        { length: 100 }, 
        () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
      );
      const recurse = () => {
        const nextMove = randomSequence.pop()
        if(!nextMove){
          return
        }
        executeMove(nextMove, SCRAMBLE_ROTATION_TIME, false)
  
        if(randomSequence.length){
          setTimeout(recurse, SCRAMBLE_ROTATION_TIME)
        }
        else {
          resolve(true);
        }
      };

      recurse()
    })
  }, [executeMove, clearMoves])
}

export default useScramble