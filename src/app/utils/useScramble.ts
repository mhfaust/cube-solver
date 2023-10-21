import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import useMoveFunctions from "./useMoveFunctions"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {

  const moveFunctions = useMoveFunctions()

  return useCallback(() => {

    const randomSequence = Array.from(
      { length: 100 }, 
      () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
    )
    const recurse = () => {
      const nextMove = randomSequence.pop()
      moveFunctions[nextMove!](SRAMBLE_ROTATION_TIME)
      if(randomSequence.length){
        setTimeout(recurse, SRAMBLE_ROTATION_TIME)
      }
    }
    recurse()
  }, [moveFunctions])
}

export default useScramble