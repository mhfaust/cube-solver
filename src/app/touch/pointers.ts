import { ThreeEvent } from "@react-three/fiber"
import { MutableRefObject } from "react"
import { MovePointer, Pointers } from "../components/Cubes"
import { displacement, interval } from "../utils/vectors"
import { MIN_SPEED_ASSESS_TIME } from "../utils/constants"

const { PI, abs, sqrt, pow, atan } = Math
// type  PointersRef = MutableRefObject<Record<number, ThreeEvent<PointerEvent>>>

export function addDownPointer(pointers: Pointers, downPointer: ThreeEvent<PointerEvent>) {
  pointers[downPointer.pointerId] = {
    down: downPointer,
    moves: [],
  }
}
export function addMovePointer(pointers: Pointers, e: ThreeEvent<PointerEvent>) {
  const p = pointers[e.pointerId]
  if(!p)
  {
    return undefined
  }
  (e as MovePointer).displacement = p.moves.length > 1
    ? displacement(e, p.moves[p.moves.length - 1])
    : 0
  p.moves.push(e as MovePointer)

  if(p.moves.length < 2) {
    return undefined
  }

  let cumTime = 0, travelled = 0, i = p.moves.length - 1
  while(cumTime < MIN_SPEED_ASSESS_TIME && i > 0) {
    travelled += p.moves[i -1].displacement
    cumTime += interval(p.moves[i -1], p.moves[i])
    i--
  }
  if (cumTime < MIN_SPEED_ASSESS_TIME ) {
    return undefined
  }
  const avSpeed = travelled / cumTime

  return avSpeed
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
