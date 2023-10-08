import { pipe } from 'ramda'
import { zPos, zNeg, xPos, xNeg, yNeg, yPos,  } from '../layerRotations'
import { xxxPos, xxxNeg, yyyNeg, yyyPos,  } from '../cubeRotations'

export const up = yNeg(0, 3)
export const up_inverted = yPos(0, 3)
export const right = xNeg(2, 3)
export const right_inverted = xPos(2, 3)
export const left = xPos(0, 3)
export const left_inverted = xNeg(0, 3)
export const down = yPos(2, 3)
export const down_inverted = yNeg(2, 3)
export const front = zPos(0, 3)
export const front_inverted = zNeg(0, 3)
export const back = zNeg(2, 3)
export const back_inverted = zPos(2, 3)
export const up2 = pipe(yNeg(0, 3), yNeg(0, 3))
export const left2 = pipe(xNeg(0, 3), xNeg(0, 3))
export const right2 = pipe(xNeg(2, 3), xNeg(2, 3))
export const down2 = pipe(yPos(2, 3), yPos(2, 3))
export const front2 = pipe(zPos(0, 3), zPos(0, 3))
export const back2 = pipe(zNeg(2, 3), zNeg(2, 3))
export const north = xxxNeg
export const south = xxxPos
export const east = yyyPos
export const west = yyyNeg

export const fnKeys = Object.keys(fns).reduce((obj, key) => ({ ...obj, [key]: key }), {})