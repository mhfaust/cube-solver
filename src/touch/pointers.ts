import { ThreeEvent } from "@react-three/fiber"
import { displacement, interval } from "@/utils/vectors"
import { MIN_SPEED_ASSESS_TIME } from "@/utils/constants"

const { PI, abs, sqrt, pow, atan } = Math


export type MovePointer = ThreeEvent<PointerEvent & { displacement: number} >

export type Pointers = Record<number, {
	down: ThreeEvent<PointerEvent>
	moves: MovePointer[]
}>

/**
 * Registers a new pointer-down event by pointer id.
 *
 * @param pointers - Active pointer registry.
 * @param downPointer - Pointer-down event.
 */
export function addDownPointer(pointers: Pointers, downPointer: ThreeEvent<PointerEvent>) {
  pointers[downPointer.pointerId] = {
    down: downPointer,
    moves: [],
  }
}
/**
 * Appends a pointer-move event and returns average recent speed when enough movement exists.
 *
 * @param pointers - Active pointer registry.
 * @param e - Pointer-move event.
 */
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

/**
 * Returns the latest move event for a pointer id.
 *
 * @param pointers - Active pointer registry.
 * @param pointerId - Pointer id.
 */
export const getLatestMove = (pointers: Pointers, pointerId: number) => {
  const { moves } = pointers[pointerId]
  return moves[moves.length - 1]
}

/**
 * Returns the pointer entry that does not match the provided pointer id.
 *
 * @param pointers - Active pointer registry.
 * @param pointer - Pointer event to exclude.
 */
export const getOtherPointer = (pointers: Pointers, pointer: ThreeEvent<PointerEvent>) => {
	return Object.values(pointers).find(p => p && p.down.pointerId !== pointer.pointerId)
}

/**
 * Removes pointer tracking for a specific pointer id.
 *
 * @param pointers - Active pointer registry.
 * @param pointerId - Pointer id to delete.
 */
export const removePointer = (
	pointers: Pointers, 
	pointerId: number,
) => {
  if (pointers[pointerId]){
    delete pointers[pointerId]
  }
}

/**
 * Clears all tracked pointers.
 *
 * @param pointers - Active pointer registry.
 */
export const resetPointers = (pointers: Pointers) => {
  Object.values(pointers).forEach(p => delete pointers[p.down.pointerId])
}

/**
 * Checks whether the pointer event originated on a cube block mesh.
 *
 * @param e - Pointer event to inspect.
 */
export const isOnCube = (e?: ThreeEvent<PointerEvent>) => {
	return Boolean(e?.eventObject.parent?.parent)
}

export type AxisDirection = 'down' | 'up' | 'left' | 'right'
export type QuadrantDirection = 'upLeft' | 'upRight' | 'downLeft' | 'downRight'

/**
 * Computes geometric swipe metrics and directional classification between two pointer events.
 *
 * @param downPointer - Pointer-down event.
 * @param upPointer - Pointer-up event.
 */
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

