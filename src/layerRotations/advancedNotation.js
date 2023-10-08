import { pipe } from 'ramda'
import {
    zPos,
    zNeg,
    xPos,
    xNeg,
    yNeg,
    yPos,
} from '.'

const size = 3
const last = size -1

export const U =  yNeg(0, size)
export const Ui =  yPos(0, size)
export const D =  yPos(last, size)
export const Di =  yNeg(last, size)
export const U2 =  pipe(yNeg(0, size), yNeg(0, size))
export const R =  xNeg(last, size)
export const Ri =  xPos(last, size)
export const L =  xPos(0, size)
export const Li =  xNeg(0, size)
export const F =  zPos(0, size)
export const Fi =  zNeg(0, size)
export const B =  zNeg(last, size)
export const Bi =  zPos(last, size)
export const E =  yPos(1, size)
export const Ei =  yNeg(1, size)
export const M =  xPos(1, size)
export const Mi =  xNeg(1, size)
export const S =  zPos(1, size)
export const Si =  zNeg(1, size)