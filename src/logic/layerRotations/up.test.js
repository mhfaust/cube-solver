import { pipe } from 'ramda'
import newCube from '../newCube'
import printCube from '../console/printCube'
import { U, Ui, U2, R, Ri, L, Li, F, Fi, B, Bi, M, Mi, S, Si } from '../layerRotations/advancedNotation'
import { xPos, xNeg, yNeg, yPos, zPos, counterWise } from './index'
import { identity } from '../cubeUtils'

import { xxxNeg, yyyPos } from '../cubeRotations'
const 

superFlip = [
    Mi, U, Mi, U, Mi, U, Mi, U,
    xxxNeg(3), yyyPos(3),
    Mi, U, Mi, U, Mi, U, Mi, U,
    xxxNeg(3), yyyPos(3),
    Mi, U, Mi, U, Mi, U, Mi, U,
]


const step4 = [F, R, U, Ri, Ui, Fi]
const step5 = [Ri, U, U, R, U, Ri, U, R, U]
const step6 = [Ri, F, Ri, B, B, R, Fi, Ri, B, B, R, R]
const step7 = [R, Ui, R, U, R, U, R, Ui, Ri, Ui, R, R]

describe('xNeg', () => {
    it('rotates the front right face up correctly', () => {
        const cube = newCube(3)
        const transform = pipe(...superFlip, ...superFlip)

        // const next = transform(cube)
        // console.log(printCube(next)) 
        
    })
})