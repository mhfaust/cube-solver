import { MoveCode } from "../utils/moveCodes"

const oneLayerSpins: MoveCode[] = [
  'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
  'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
  'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′'
]
const n = Object.keys(oneLayerSpins).length

const scramble = (moveFns: Record<MoveCode, (time: number) => void>, rotationTime: number) => {

  const a = Array.from(
    { length: 100 }, 
    () => oneLayerSpins[Math.floor(Math.random() * n)]
  )
  const recurse = () => {
    if(!a?.length) {
      return
    }
    const c = a.pop()
    moveFns[c!](rotationTime)
    if(a.length){
      setTimeout(recurse, rotationTime + 1)
    }
  }
  recurse()
}

export default scramble