import { ThreeEvent } from "@react-three/fiber"
import { MutableRefObject } from "react"

const { PI, abs, sqrt, pow } = Math
type  Pointers = MutableRefObject<ThreeEvent<PointerEvent>[]>

export const getPointer = (pointers: Pointers, id: number) => {
	return pointers.current.find(p => p.pointerId === id)
}

export const getOtherPointer = (pointers: Pointers, pointer: ThreeEvent<PointerEvent>) => {
	return pointers.current.find(p => p.pointerId !== pointer.pointerId)
}

export const removePointer = (
	pointers: Pointers, 
	pointer: ThreeEvent<PointerEvent>
) => {
	pointers.current = pointers.current.filter(p => p.pointerId !== pointer.pointerId)
}

export const resetPointers = (pointers: Pointers) => {
  pointers.current = []
}

export const isOnCube = (e?: ThreeEvent<PointerEvent>) => {
	return Boolean(e?.eventObject.parent?.parent)
}

export type SwipeDirection = 'swipedDown' | 'swipedUp' | 'swipedRight' | 'swipedLeft'

export const swipeInfo = (
  downPointer: ThreeEvent<PointerEvent>,
  upPointer: ThreeEvent<PointerEvent>
) => {

  const dx = upPointer.x - downPointer.x
  const dy = upPointer.y - downPointer.y
  const distance = sqrt(pow(dx, 2) + pow(dy, 2))
  const time = upPointer.timeStamp - downPointer.timeStamp
  const isVertical = abs(dy) > abs(dx) 
  const direction: SwipeDirection = isVertical 
    ? (dy > 0 ? 'swipedDown' : 'swipedUp')
    : (dx > 0 ? 'swipedRight' : 'swipedLeft')

  return { dx, dy, distance, time, isVertical, direction }
}


// const twoFingerSwipe()