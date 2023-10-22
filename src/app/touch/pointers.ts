import { ThreeEvent } from "@react-three/fiber"
import { MutableRefObject } from "react"
import { Pointers } from "../components/Cubes"

const { PI, abs, sqrt, pow, atan } = Math
// type  PointersRef = MutableRefObject<Record<number, ThreeEvent<PointerEvent>>>

export function addDownPointer(pointers: Pointers, downPointer: ThreeEvent<PointerEvent>) {
  pointers[downPointer.pointerId] = {
    down: downPointer,
    moves: []
  }
}
export function addMovePointer(pointers: Pointers, movePointer: ThreeEvent<PointerEvent>) {
  const p = pointers[movePointer.pointerId]?.moves.push(movePointer)
}

export const getLatestMove = (pointers: Pointers, pointerId: number) => {
  const { moves } = pointers[pointerId]
  return moves[moves.length - 1]
}

export const getOtherPointer = (pointers: Pointers, pointer: ThreeEvent<PointerEvent>) => {
	return Object.values(pointers).find(p => p && p.down.pointerId !== pointer.pointerId)
}

export const removePointer = (
	pointers: Pointers, 
	pointerId: number,
) => {
  if (pointers[pointerId]){
    delete pointers[pointerId]
  }
	
  //(p => p.pointerId !== pointer.pointerId)
}

export const resetPointers = (pointers: Pointers) => {
  Object.values(pointers).forEach(p => delete pointers[p.down.pointerId])
}

export const isOnCube = (e?: ThreeEvent<PointerEvent>) => {
	return Boolean(e?.eventObject.parent?.parent)
}

export type AxisDirection = 'down' | 'up' | 'left' | 'right'
export type QuadrantDirection = 'upLeft' | 'upRight' | 'downLeft' | 'downRight'

export const swipeInfo = (
  downPointer: ThreeEvent<PointerEvent>,
  upPointer: ThreeEvent<PointerEvent>
) => {

  const dx = upPointer.x - downPointer.x
  const dy = upPointer.y - downPointer.y
  const distance = sqrt(pow(dx, 2) + pow(dy, 2))
  const time = upPointer.timeStamp - downPointer.timeStamp
  const isVertical = abs(dy) > abs(dx) 

  const axisDirection: AxisDirection = isVertical 
    ? (dy > 0 ? 'down' : 'up')
    : (dx > 0 ? 'right' : 'left')

  const quadrantDirection: QuadrantDirection = dy > 0 
    ? (dx > 0 ? 'downRight' : 'downLeft')
    : (dx > 0 ? 'upRight' : 'upLeft')

  const t = ({
    upRight: () => atan(-dy / dx),
    upLeft: () => PI + atan(-dy / dx),
    downLeft: () => PI + atan(-dy / dx),
    downRight: () => 2 * PI + atan(-dy / dx)
  })[quadrantDirection]()

  const theta = t * (180 / PI)


  return { dx, dy, distance, time, isVertical, theta, axisDirection, quadrantDirection }
}

// class PointerSet {

//   pointers: Record<number, ThreeEvent<PointerEvent>>

//   constructor () {
//     this.pointers = {}
//   }

//   add (pointer: ThreeEvent<PointerEvent>) {
//     this.pointers[pointer.pointerId] = pointer
//   }

//   remove (pointer: ThreeEvent<PointerEvent>) {
//     delete this.pointers[pointer.pointerId]
//   }

//   retrieve (id: number) {
//     return this.pointers[id]
//     // return Object.values(this.pointers).find(p => p.pointerId === id)
//   }

//   clear () {
//     Object.values(this.pointers).forEach(p => delete this.pointers[p.pointerId])
//   }

//   siblings (pointer: ThreeEvent<PointerEvent>) {
//     return Object.values(this.pointers).filter(p => p.pointerId !== pointer.pointerId)
//   }

//   isOnCube = (e?: ThreeEvent<PointerEvent>) => {
//     return Boolean(e?.eventObject.parent?.parent)
//   }
// }

// export class Pointers {
//   down: PointerSet
//   move: PointerSet

//   constructor () {
//     this.down = new PointerSet()
//     this.move = new PointerSet()
//   }

//   swipeInfo(up: ThreeEvent<PointerEvent>) {
//     const down = this.down.retrieve(up.pointerId)
//     return swipeInfo(down, up)
//   }

//   allSwipeInfo() {
//     Object.values(this.down).map((down) => {
//       return swipeInfo(down, this.move.retrieve(down.pointerId))
//     })
//   }

//   clear() {
//     this.down.clear()
//     this.move.clear()
//   }

//   isOnCube = (e: ThreeEvent<PointerEvent>) => {
//     return Boolean(e.eventObject.parent?.parent)
//   }

//   getDown(upPointer: ThreeEvent<PointerEvent>) {
//     return this.down.retrieve(upPointer.pointerId)
//   }

//   remove(e: ThreeEvent<PointerEvent>) {
//     this.down.remove(e)
//     this.move.remove(e)
//   }

//   get fingers() {
//     return Object.values(this.move).length
//   }

//   anyOnCube() {
//     return Object.values(this.down.pointers).some(p => parent?.parent)
//   }
// }
