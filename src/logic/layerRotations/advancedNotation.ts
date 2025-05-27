import { CubeFaces } from '../newCube'
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
export const U2 =  (cube: CubeFaces) => yNeg(0)(yNeg(0)(cube))
export const R =  xNeg(2)
export const Ri =  xPos(2)
export const L =  xPos(0)
export const Li =  xNeg(0)
export const F =  zPos(0)
export const Fi =  zNeg(0)
export const B =  zNeg(2)
export const Bi =  zPos(2)
export const E =  yPos(1)
export const Ei =  yNeg(1)
export const M =  xPos(1)
export const Mi =  xNeg(1)
export const S =  zPos(1)
export const Si =  zNeg(1)