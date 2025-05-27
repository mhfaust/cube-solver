import { xxxNeg } from '../cubeRotations/xxxNeg'
import { xxxPos } from '../cubeRotations/xxxPos'
import { yyyNeg } from '../cubeRotations/yyyNeg'
import { yyyPos } from '../cubeRotations/yyyPos'
import { zzzNeg } from '../cubeRotations/zzzNeg'
import { zzzPos } from '../cubeRotations/zzzPos'
import { xNeg } from './xNeg'
import { xPos } from './xPos'
import { yNeg } from './yNeg'
import { yPos } from './yPos'
import { zNeg } from './zNeg'
import { zPos } from './zPos'


export const U =  yNeg(0)
export const Ui =  yPos(0)
export const D =  yPos(2)
export const Di =  yNeg(2)
export const R =  xNeg(2)
export const Ri =  xPos(2)
export const L =  xPos(0)
export const Li =  xNeg(0)
export const F =  zPos(0)
export const Fi =  zNeg(0)
export const B =  zNeg(2)
export const Bi =  zPos(2)
export const Yi = yyyNeg
export const Y = yyyPos
export const Xi = xxxNeg
export const X = xxxPos
export const Zi = zzzPos
export const Z = zzzNeg
export const E =  yPos(1)
export const Ei =  yNeg(1)
export const M =  xPos(1)
export const Mi =  xNeg(1)
export const S =  zPos(1)
export const Si =  zNeg(1)

export const faceTransformsByNotation = {
    U,
    Ui,
    D,
    Di,
    R,
    Ri,
    L,
    Li,
    F,
    Fi,
    B,
    Bi,
    Yi,
    Y,
    Xi,
    X,
    Zi,
    Z,
    E,
    Ei,
    M,
    Mi,
    S,
    Si,
}