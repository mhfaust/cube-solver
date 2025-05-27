import { A2, Z2, A1, Z1, A3, COLOR_Z_3, COLOR_A_3 } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { zNeg } from './zNeg'

describe('zNeg', () => {
    it('zNeg(0)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(0)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[Z2,A1,A1],[Z2,A1,A1],[Z2,A1,A1]],
            back: faceOf(COLOR_A_3),
            left: [[Z1,Z1,A2],[Z1,Z1,A2],[Z1,Z1,A2]],
            top: [[A2,A2,A2],[A2,A2,A2],[A1,A1,A1]],
            bottom: [[Z1,Z1,Z1],[Z2,Z2,Z2],[Z2,Z2,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(1)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(1)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[A1,Z2,A1],[A1,Z2,A1],[A1,Z2,A1]],
            back: faceOf(COLOR_A_3),
            left: [[Z1,A2,Z1],[Z1,A2,Z1],[Z1,A2,Z1]],
            top: [[A2,A2,A2],[A1,A1,A1],[A2,A2,A2]],
            bottom: [[Z2,Z2,Z2],[Z1,Z1,Z1],[Z2,Z2,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(2)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(2)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[A1,A1,Z2],[A1,A1,Z2],[A1,A1,Z2]],
            back: faceOf(COLOR_A_3),
            left: [[A2,Z1,Z1],[A2,Z1,Z1],[A2,Z1,Z1]],
            top: [[A1,A1,A1],[A2,A2,A2],[A2,A2,A2]],
            bottom: [[Z2,Z2,Z2],[Z2,Z2,Z2],[Z1,Z1,Z1]],
        }
        expect(trans).to.deep.equal(expected)
    })
})