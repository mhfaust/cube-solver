import newCube from '../newCube'
import printCube from '../console/printCube'
import { U, Ui, U2, R, Ri, L, Li, F, Fi, B, Bi, M, Mi, S, Si } from '../layerRotations/advancedNotation'

import { xxxNeg, yyyPos } from '../cubeRotations'
import { pipe } from '../cubeUtils'
const 

superFlip = [
    Mi, U, Mi, U, Mi, U, Mi, U,
    xxxNeg, yyyPos,
    Mi, U, Mi, U, Mi, U, Mi, U,
    xxxNeg, yyyPos,
    Mi, U, Mi, U, Mi, U, Mi, U,
]


const step4 = [F, R, U, Ri, Ui, Fi]
const step5 = [Ri, U, U, R, U, Ri, U, R, U]
const step6 = [Ri, F, Ri, B, B, R, Fi, Ri, B, B, R, R]
const step7 = [R, Ui, R, U, R, U, R, Ui, Ri, Ui, R, R]

// describe('superflip', () => {
//     it('rotates the front right face up correctly', () => {
//         const cube = newCube()
//         const transform = pipe(...superFlip, ...superFlip)

//         const next = transform(cube)
//         console.log(printCube(next)) 
        
//     })
// })