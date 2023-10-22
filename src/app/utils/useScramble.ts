import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import useSpinFunctions from "./useSpinFunctions"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SRAMBLE_ROTATION_TIME = 5 //very fast 

const useScramble = () => {

  const spinFunctions = useSpinFunctions()

  return useCallback(() => {

    const randomSequence = Array.from(
      { length: 100 }, 
      () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
    )
    const recurse = () => {
      const nextMove = randomSequence.pop()
      spinFunctions[nextMove!](SRAMBLE_ROTATION_TIME)
      if(randomSequence.length){
        setTimeout(recurse, SRAMBLE_ROTATION_TIME)
      }
    }
    recurse()
  }, [spinFunctions])
}

export default useScramble