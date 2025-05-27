import { A2, Z2, COLOR_Z_1, COLOR_A_1, Z3, A3 } from '../constants'
import { newCubeFaces, faceOf } from '../newCube'

import { xNeg } from './xNeg'
import { expect } from 'chai'

describe('xNeg', () => {
    it('xNeg(0)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(0)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[Z2,Z3,Z3],[Z2,Z3,Z3],[Z2,Z3,Z3]],
            right: faceOf(COLOR_A_1),
            back: [[A3,A3,A2],[A3,A3,A2],[A3,A3,A2]],
            left: faceOf(COLOR_Z_1),
            top: [[Z3,A2,A2],[Z3,A2,A2],[Z3,A2,A2],],
            bottom: [[A3,Z2,Z2],[A3,Z2,Z2],[A3,Z2,Z2]],
        })
    })
    it('xNeg(1)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(1)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[Z3,Z2,Z3],[Z3,Z2,Z3],[Z3,Z2,Z3]],
            right: faceOf(COLOR_A_1),
            back: [[A3,A2,A3],[A3,A2,A3],[A3,A2,A3]],
            left: faceOf(COLOR_Z_1),
            top: [[A2,Z3,A2],[A2,Z3,A2],[A2,Z3,A2],],
            bottom: [[Z2,A3,Z2],[Z2,A3,Z2],[Z2,A3,Z2]],
        })
    })
    it('xNeg(2)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(2)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[Z3,Z3,Z2],[Z3,Z3,Z2],[Z3,Z3,Z2]],
            right: faceOf(COLOR_A_1),
            back: [[A2,A3,A3],[A2,A3,A3],[A2,A3,A3]],
            left: faceOf(COLOR_Z_1),
            top: [[A2,A2,Z3],[A2,A2,Z3],[A2,A2,Z3],],
            bottom: [[Z2,Z2,A3],[Z2,Z2,A3],[Z2,Z2,A3]],
        })
    })
})