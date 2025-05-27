import { newCubeFaces } from '../newCube'
import { printCube } from '../console/printCube'
import { U, Ui, R, Ri, L, Li, F, Fi, B, Bi, M, Mi, S, Si } from '../layerRotations/advancedNotation'

import { pipe } from '../cubeUtils'
import { xxxNeg } from '../cubeRotations/xxxNeg'
import { yyyPos } from '../cubeRotations/yyyPos'
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
//         const cube = newCubeFaces()
//         const transform = pipe(...superFlip, ...superFlip)

//         const next = transform(cube)
//         console.log(printCube(next)) 
        
//     })
// })