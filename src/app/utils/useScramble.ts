import { useCallback } from "react"
import { MoveCode } from "./moveCodes"
import useMoveFunctions from "./useMoveFunctions"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const numSpinTypes = Object.keys(oneLayerSpins).length

const SRAMBLE_ROTATION_TIME = 3 //very fast 

const useScramble = () => {

  const moveFunctions = useMoveFunctions()

  return useCallback(() => {

    const a = Array.from(
      { length: 100 }, 
      () => oneLayerSpins[Math.floor(Math.random() * numSpinTypes)]
    )
    const recurse = () => {
      if(!a?.length) {
        return
      }
      const c = a.pop()
      moveFunctions[c!](SRAMBLE_ROTATION_TIME)
      if(a.length){
        setTimeout(recurse, SRAMBLE_ROTATION_TIME)
      }
    }
    recurse()
    return 
  }, [moveFunctions])
}

export default useScramble